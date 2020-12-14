import * as s from './sagas'

import {put} from 'redux-saga/effects'

/* eslint-disable no-undef */
describe('Sagas tests', () => {
    const firstTag = "jeux-vidéos";
    test('getAsyncTags', async () => {
        const test = await s.getAsyncTags('tags', 1)
        expect(
            test.val()
        ).toStrictEqual(
            firstTag
        )
    })
    test('getTags', async () => {
        const test = s.getTags()
        test.next() // some call
        expect(
            test.next().value
        ).toStrictEqual(
            put({ type: "TEST_TAG_SAGA", payload: firstTag })
        )
    })
    test('getTagsRSF', async () => {
        const test = s.getTagsRSF()
        test.next() // some call
        expect(
            test.next().value
        ).toStrictEqual(
            put({ type: "TEST_TAG_RSF", payload: firstTag })
        )
    })
});