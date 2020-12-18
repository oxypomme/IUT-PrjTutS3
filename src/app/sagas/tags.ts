import { call, put, takeLatest, take } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
  fetchTags,
  fetchTagsSuccess,
  fetchTagsFailed
} from "../../features/accounts/tagSlice";

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
    yield put(fetchTagsFailed(error.message));
  }
}

export default function* tagsSagas() {
  yield takeLatest(fetchTags.type, getTags);
}
