import { call, put, takeLatest, take } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";
import {
  fetchTags,
  fetchTagsSuccess,
} from "../../features/accounts/accountSlice";

function* getTags(action) {
  try {
    const { request } = action.payload;
    const tags = yield call(
      rsf.database[request.type],
      request.url,
      request.params
    );
    yield put(fetchTagsSuccess(tags));
  } catch (error) {
    yield put({ type: "FETCH_TAGS_FAILED", payload: error.message });
  }
}

export default function* tagsSagas() {
  yield takeLatest(fetchTags.type, getTags);
}
