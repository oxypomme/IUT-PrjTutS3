import { call, put, takeLatest, select, all } from "redux-saga/effects";
import { rsf } from "../firebase";
import firebase from '@firebase/app';
import "@firebase/database";

import {
    fetchMatches,
    fetchMatchesSuccess,
    fetchMatchesFailed,
    createMatchSuccess,
    createMatchFailed,
    newMatch,
    deleteMatchSuccess,
    deleteMatchFailed,
    deleteMatch
} from "../../features/accounts/matches/matchesSlice";
import { getAuthId } from "../../features/accounts/accountSlice";

import {
    fetchArrayProfile
} from "../../features/accounts/profileSlice";

function* getMatches(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId == "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const outgoingMatches = yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            request.params
        );

        // Récupère tout les matchs des personnes qui m'ont matchés
        const incomingRawMatches = yield call(
            rsf.database[request.type],
            firebase.database().ref(request.url).orderByChild(authId + '/isBlocked').equalTo(false),
            request.params
        );
        const incomingMatches = {};
        Object.getOwnPropertyNames(incomingRawMatches)?.forEach(key => {
            if (incomingRawMatches[key][authId]) {
                incomingMatches[key] = incomingRawMatches[key][authId];
            }
        });

        yield put(fetchMatchesSuccess({ incomingMatches, outgoingMatches }));

        yield put(fetchArrayProfile(Object.keys({ ...incomingMatches, ...outgoingMatches })))
    } catch (error) {
        yield put(fetchMatchesFailed(error.message));
    }
}

function* createMatch(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId == "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const { targetId, data, ...params } = request.params;
        yield call(
            rsf.database[request.type],
            request.url + '/' + authId + '/' + targetId,
            { ...data, ...params }
        );
        yield put(createMatchSuccess());

        yield put(fetchMatches());
    } catch (error) {
        yield put(createMatchFailed(error.message));
    }
}

function* removeMatch(action) {
    try {
        const authId = yield select(getAuthId);
        if (authId == "") {
            throw new Error("User not connected");
        }

        const { request } = action.payload;
        const { targetId, ...params } = request.params;
        yield call(
            rsf.database[request.type],
            request.url + '/' + authId + '/' + targetId,
            params
        );

        yield put(deleteMatchSuccess());

        yield put(fetchMatches());
    } catch (error) {
        yield put(deleteMatchFailed(error.message));
    }
}

export default function* matchesSagas() {
    yield all([
        takeLatest(fetchMatches.type, getMatches),
        takeLatest(newMatch.type, createMatch),
        takeLatest(deleteMatch, removeMatch),
    ]);
}
