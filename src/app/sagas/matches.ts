import { call, put, takeLatest, select, all, fork, take } from "redux-saga/effects";

import { rsf } from "../firebase";
import firebase from '@firebase/app';
import "@firebase/database";

import {
    createMatchSuccess,
    createMatchFailed,
    newMatch,
    deleteMatchSuccess,
    deleteMatchFailed,
    deleteMatch,
    updateMatch,
    updateMatchFailed,
    updateMatchSuccess,
    syncMatchesFailed,
    syncOutMatchesSuccess,
    syncInMatchesSuccess
} from "../../features/accounts/matches/matchesSlice";

import { getAuthId } from "../../features/accounts/accountSlice";

import {
    fetchCurrProfilesSuccess
} from "../../features/accounts/profileSlice";

function* createMatch(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId == "") {
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
        yield put(createMatchSuccess());
    } catch (error) {
        yield put(createMatchFailed(error.message));
    }
}

function* updaMatch(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId == "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const { matchId, data, ...params } = request.params;
        yield call(
            rsf.database[request.type],
            request.url + '/' + matchId,
            { ...data, ...params }
        );
        yield put(updateMatchSuccess());
    } catch (error) {
        yield put(updateMatchFailed(error.message));
    }
}

function* removeMatch(action) {
    try {
        const { request } = action.payload;
        const { matchId, ...params } = request.params;
        yield call(
            rsf.database[request.type],
            request.url + '/' + matchId,
            params
        );

        yield put(deleteMatchSuccess());
    } catch (error) {
        yield put(deleteMatchFailed(error.message));
    }
}

function* syncMatches() {
    try {
        yield take(fetchCurrProfilesSuccess);
        const authId = yield select(getAuthId);

        // Out matches
        yield fork(
            rsf.database.sync,
            firebase.database().ref('/matches').orderByChild('/sender').equalTo(authId),
            {
                successActionCreator: syncOutMatchesSuccess,
                transform: ({ value: rawMatch }) => {
                    const matchs = {};
                    Object.keys(rawMatch)?.forEach((key) => {
                        const match = rawMatch[key];

                        matchs[match.target] = {
                            key,
                            isBlocked: match.isBlocked
                        }
                    });

                    return matchs;
                }
            },
            'value'
        );

        // In matches
        yield fork(
            rsf.database.sync,
            firebase.database().ref('/matches').orderByChild('/target').equalTo(authId),
            {
                successActionCreator: syncInMatchesSuccess,
                transform: ({ value: rawMatch }) => {
                    const matchs = {};
                    Object.keys(rawMatch)?.forEach((key) => {
                        const match = rawMatch[key];

                        matchs[match.sender] = {
                            key,
                            isBlocked: match.isBlocked
                        }
                    });

                    return matchs;
                }
            },
            'value'
        );
    } catch (error) {
        yield put(syncMatchesFailed(error.message));
    }
}

export default function* matchesSagas() {
    yield all([
        takeLatest(newMatch.type, createMatch),
        takeLatest(updateMatch.type, updaMatch),
        takeLatest(deleteMatch, removeMatch),
        fork(syncMatches),
    ]);
}
