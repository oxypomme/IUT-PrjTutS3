import { call, put, takeLatest, all, take, fork } from "redux-saga/effects";

import { rsf } from "../firebase";
import "@firebase/database";

import {
    fetchTags,
    fetchTagsSuccess,
    fetchTagsFailed,
    fetchTag,
    fetchTagSuccess,
    fetchTagFailed,
    fetchArrayTag,
    fetchArrayTagSuccess,
    fetchArrayTagFailed,
} from "../../features/accounts/tagSlice";
import { channel } from "redux-saga";

function* getTags(action) {
    try {
        const { request } = action.payload;
        const tags = yield call(
            rsf.database[request.type],
            request.url,
            request.params
        );
        yield put(fetchTagsSuccess(tags.map((tag, index) => ({ value: index, label: tag }))));
    } catch (error) {
        yield put(fetchTagsFailed(error.message));
    }
}

function* getTag(action) {
    try {
        const { request } = action.payload;
        const { tagId, ...params } = request.params;

        const tag = yield call(
            rsf.database[request.type],
            request.url + '/' + tagId,
            params
        );
        yield put(fetchTagSuccess({ value: tagId, label: tag }));
    } catch (error) {
        yield put(fetchTagFailed(error.message));
    }
}

function* getArrayTagsChannel() {
    const chan = yield call(channel);
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const { payload } = yield take([
            fetchArrayTag.type,
        ]);
        yield fork(getArrayTag, chan);
        yield put(chan, payload);
    }
}

function* getArrayTag(chan) {
    const payload = yield take(chan)
    try {
        /*
        let request = {
            type: "read",
            url: "/profiles",
        };
        let authIds = Object.keys(payload);
        let fparams = {};
        if (payload.request) {
            request = payload.request;
            const { authIds: tmpIds, ...params } = payload.request.params;
            authIds = tmpIds;
            fparams = params;
        }
        */
        const { request } = payload;
        const { tagsIds, ...params } = request.params;

        let tags = [];

        for (let i = 0; i < tagsIds.length; i++) {
            const tagId = tagsIds[i];
            const tag = yield call(
                rsf.database[request.type],
                request.url + '/' + tagId,
                params
            );
            tags = [...tags, { value: tagId, label: tag }];
        }

        yield put(fetchArrayTagSuccess(tags));
    }
    catch (error) {
        yield put(fetchArrayTagFailed(error.message));
    }
}

export default function* tagsSagas() {
    yield all([
        takeLatest(fetchTags.type, getTags),
        takeLatest(fetchTag.type, getTag),
        fork(getArrayTagsChannel),
    ]);
}
