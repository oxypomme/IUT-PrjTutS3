import { call, put, takeLatest, take, all } from "redux-saga/effects";
import { rsf } from "../firebase";
import "@firebase/database";

import {
  fetchTag,
  fetchTagSuccess,
  fetchTagFailed,
  fetchArrayTag
} from "../../features/accounts/tagSlice";

function* getTag(action) {
  try {
    const { request } = action.payload;
    const tag = yield call(
      rsf.database[request.type],
      request.url,
      request.params
    );
    yield put(fetchTagSuccess(tag));
  } catch (error) {
    yield put(fetchTagFailed(error.message));
  }
}

export function* getArrayTag(action) {
  try {
    const { request } = action.payload;
    const { tagsId, ...params } = request.params;
    yield all(tagsId.map((tagId: number) => call(getTag, {
      payload: {
        request: {
          type: request.type,
          url: request.url,
          params: { tagId, params }
        }
      }
    })));
  } catch (error) {
    yield put(fetchTagFailed(error.message));
  }
}

export default function* tagsSagas() {
  yield all([
    takeLatest(fetchTag.type, getTag),
    takeLatest(fetchArrayTag.type, getArrayTag),
  ]);
}
