import { call, put, takeLatest, select, take, all } from "redux-saga/effects";

import { rsf } from "../firebase";
import "@firebase/database";

function* fnc(action) {
    try {

        yield "yolo";
    } catch (error) {
        yield "erreur";
    }
}

export default function* chatSagas() {
    yield all([
        takeLatest("type", fnc),
    ]);
}
