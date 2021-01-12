import { call, put, takeLatest, select, take, all, fork } from "redux-saga/effects";

import { rsf } from "../firebase";
import firebase from '@firebase/app';
import "@firebase/database";

import { v4 as uuidv4 } from 'uuid';

import { getAuthId } from "../../features/accounts/accountSlice";
import { fetchCurrProfilesSuccess } from "../../features/accounts/profileSlice";
import { createMessageFailed, createMessageSuccess, newMessage, syncInMessagesSuccess, syncOutMessagesSuccess } from "../../features/chat/chatSlice";
import { getStorageError, uploadFileFailed, uploadFileSuccess, uploadTypes } from "../../features/firestorage/storageSlice";

function* createMessage(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId === "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const { data, ...params } = request.params;
        let media;

        if (data.content.media) {
            const uid = uuidv4();
            yield put(uploadTypes[request.typeUpload]("messages/" + data.content.type + '/' + uid, data.content.media));

            const { payload } = yield take([uploadFileSuccess, uploadFileFailed])

            const storageError = yield select(getStorageError);
            if (storageError !== "") {
                throw new Error(storageError);
            }

            media = payload.dlUrl;
        }
        const content = {};
        if (media) {
            content["media"] = media;
            content["type"] = data.content.type;
        }
        if (data.content.text) {
            content["text"] = data.content.text;
        }

        yield call(
            rsf.database[request.type],
            request.url,
            {
                sender: authId,
                ...{
                    ...data,
                    content
                },
                ...params
            }
        );

        yield put(createMessageSuccess());
    } catch (error) {
        yield put(createMessageFailed(error.message));
    }
}

function* syncMessages() {
    try {
        while (true) {
            yield take(fetchCurrProfilesSuccess);
            const authId = yield select(getAuthId);

            // Out messages
            yield fork(
                rsf.database.sync,
                firebase.database().ref('messages').orderByChild('/sender').equalTo(authId),
                {
                    successActionCreator: syncOutMessagesSuccess,
                },
                'value'
            );

            // In messages
            yield fork(
                rsf.database.sync,
                firebase.database().ref('messages').orderByChild('/target').equalTo(authId),
                {
                    successActionCreator: syncInMessagesSuccess,
                },
                'value'
            );
        }
    } catch (error) {
        yield error;
    }
}

export default function* chatSagas() {
    yield all([
        takeLatest(newMessage.type, createMessage),
        fork(syncMessages),
    ]);
}
