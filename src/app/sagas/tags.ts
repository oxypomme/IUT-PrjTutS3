import { call, put, takeLatest, take, all } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
  fetchTags,
  fetchTagsSuccess,
  fetchTagsFailed,
  fetchTag,
  fetchTagSuccess,
  fetchTagFailed,
  fetchArrayTag
} from "../../features/accounts/tagSlice";

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

function* getArrayTag(action) {
  try {
    const { request } = action.payload;
    const { tagsIds, ...params } = request.params;

    for (let i = 0; i < tagsIds.length; i++) {
      const tagId = tagsIds[i];
      yield put(fetchTag(tagId, params));
      yield take([fetchTagSuccess, fetchTagFailed]);
    }

  } catch (error) {
    yield put(fetchTagsFailed(error.message));
  }
}

export default function* tagsSagas() {
  yield all([
    takeLatest(fetchTags.type, getTags),
    takeLatest(fetchTag.type, getTag),
    takeLatest(fetchArrayTag.type, getArrayTag),
  ]);
}
