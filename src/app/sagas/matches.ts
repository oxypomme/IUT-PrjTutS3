import { call, put, takeLatest, select } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
    fetchMatches,
    fetchMatchesSuccess,
    fetchMatchesFailed
} from "../../features/accounts/matches/matchesSlice";
import { getCurrProfile } from "../../features/accounts/profileSlice";

function* getMatches(action) {
    try {
        const { key } = yield select(getCurrProfile);

        const { request } = action.payload;
        const matches = yield call(
            rsf.database[request.type],
            request.url + '/' + key,
            request.params
        );
        yield put(fetchMatchesSuccess(matches));
    } catch (error) {
        yield put(fetchMatchesFailed(error.message));
    }
}

export default function* matchesSagas() {
    yield takeLatest(fetchMatches.type, getMatches);
}
