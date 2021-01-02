import { call, put, takeLatest, select, take } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
    fetchMatches,
    fetchMatchesSuccess,
    fetchMatchesFailed
} from "../../features/accounts/matches/matchesSlice";
import { getAuthId } from "../../features/accounts/accountSlice";

import {
    fetchArrayProfile,
    fetchProfilesFailed,
    fetchProfilesSuccess,
    getProfileError
} from "../../features/accounts/profileSlice";

function* getCurrMatches(action) {
    try {
        const authId = yield select(getAuthId);

        const { request } = action.payload;
        const matches = yield call(
            rsf.database[request.type],
            request.url + '/' + authId,
            request.params
        );
        yield put(fetchMatchesSuccess(matches));

        yield put(fetchArrayProfile(Object.keys(matches)))
        yield take([fetchProfilesSuccess, fetchProfilesFailed]);
        const profileError = yield select(getProfileError);
        if (profileError != "") {
            throw new Error(profileError);
        }
    } catch (error) {
        yield put(fetchMatchesFailed(error.message));
    }
}

export default function* matchesSagas() {
    yield takeLatest(fetchMatches.type, getCurrMatches);
}
