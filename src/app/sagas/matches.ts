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
    deleteMatch,
    updateMatch,
    updateMatchFailed,
    updateMatchSuccess
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
        const outgoingRawMatches = yield call(
            rsf.database[request.type],
            firebase.database().ref(request.url).orderByChild('/sender').equalTo(authId),
            request.params
        );
        const outgoingMatches = {};
        Object.keys(outgoingRawMatches).forEach(matchId => {
            const { target, isBlocked } = outgoingRawMatches[matchId];
            outgoingMatches[target] = { key: matchId };
            outgoingMatches[target]["isBlocked"] = isBlocked;
        });

        const incomingRawMatches = yield call(
            rsf.database[request.type],
            firebase.database().ref(request.url).orderByChild('/target').equalTo(authId),
            request.params
        );
        const incomingMatches = {};
        Object.keys(incomingRawMatches).forEach(matchId => {
            const { sender, isBlocked } = incomingRawMatches[matchId];
            incomingMatches[sender] = { key: matchId };
            incomingMatches[sender]["isBlocked"] = isBlocked;
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
        yield put(createMatchSuccess(data));

        yield put(fetchMatches());
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
            {
                sender: authId,
                ...data,
                ...params
            }
        );
        yield put(updateMatchSuccess());

        yield put(fetchMatches());
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

        yield put(fetchMatches());
    } catch (error) {
        yield put(deleteMatchFailed(error.message));
    }
}

export default function* matchesSagas() {
    yield all([
        takeLatest(fetchMatches.type, getMatches),
        takeLatest(newMatch.type, createMatch),
        takeLatest(updateMatch.type, updaMatch),
        takeLatest(deleteMatch, removeMatch),
    ]);
}
