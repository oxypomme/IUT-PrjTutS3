import { call, put, takeLatest, select } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
    fetchMatches,
    fetchMatchesSuccess,
    fetchMatchesFailed
} from "../../features/accounts/matches/matchesSlice";
import { getAuthId } from "../../features/accounts/accountSlice";

import { getArrayProfile } from "./profiles";
import { getProfileError } from "../../features/accounts/profileSlice";

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

        yield call(getArrayProfile, {
            payload: {
                request: {
                    type: "read",
                    url: "/profiles",
                    params: { authIds: Object.keys(matches) },
                },
            },
        });

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
