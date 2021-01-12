import { call, put, takeLatest, select, take, all, fork } from "redux-saga/effects";

import { rsf } from "../firebase";
import firebase from '@firebase/app';
import "@firebase/database";

import { getAuthId } from "../../features/accounts/accountSlice";
import { fetchCurrProfilesSuccess } from "../../features/accounts/profileSlice";
import { createMessageFailed, createMessageSuccess, newMessage, syncInMessagesSuccess, syncOutMessagesSuccess } from "../../features/chat/chatSlice";

function* createMessage(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId === "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const { data, ...params } = request.params;
        yield call(
            rsf.database[request.type],
            request.url,
            {
                sender: authId,
                ...data,
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
