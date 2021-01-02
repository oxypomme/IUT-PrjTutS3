import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const fetchTag = createAction(
    "FETCH_TAG_REQUESTED",
    (tagId: number, params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/tags",
                params: { tagId, ...params },
            },
        },
    })
);
export const fetchArrayTag = createAction(
    "FETCH_TAG_REQUESTED",
    (tagIds: number[], params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/tags",
                params: { tagIds, ...params },
            },
        },
    })
);

export const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: new Array<string>(),
        isFetching: false,
        error: ""
    },
    extraReducers: {
        [fetchTag.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
    },
    reducers: {
        fetchTagSuccess: (state, { payload: newTag }) => {
            const tags = [...state.tags];

            for (let i = 0; i < state.tags.length; i++) {
                const tag = state.tags[i];

                if (tag == newTag) {
                    tags.splice(i, 1);
                }
            }

            return {
                ...state,
                isWorking: false,
                error: "",
                profiles: [...tags, newTag]
            }
        },
        fetchTagFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
        }),
    }
});

export const {
    fetchTagSuccess,
    fetchTagFailed
} = tagSlice.actions;

export const getState = state => state.tags;

export const getAllTags = createSelector(getState, (state) =>
    state.tags.map((tag, key) => ({ value: key, label: tag }))
);

export const getTagError = createSelector(getState, (state) => state.error);

export default tagSlice.reducer;

