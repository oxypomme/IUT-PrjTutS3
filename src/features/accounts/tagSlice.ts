import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import ITag from "../../include/IComboBoxItem";

export const fetchTags = createAction(
    "FETCH_TAGS_REQUESTED",
    (params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/tags",
                params,
            },
        },
    })
);
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
    "FETCH_ARRAY_TAG_REQUESTED",
    (tagsIds: number[], params = {}) => ({
        payload: {
            request: {
                type: "read",
                url: "/tags",
                params: { tagsIds, ...params },
            },
        },
    })
);

export const tagSlice = createSlice({
    name: 'tags',
    initialState: {
        tags: new Array<ITag>(),
        isFetching: false,
        error: ""
    },
    extraReducers: {
        [fetchTags.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
        [fetchTag.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
        [fetchArrayTag.type]: (state) => ({
            ...state,
            isFetching: true,
            error: ""
        }),
    },
    reducers: {
        fetchTagsSuccess: (state, { payload: tags }) => ({
            ...state,
            isFetching: false,
            error: "",
            tags,
        }),
        fetchTagsFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
        }),
        fetchTagSuccess: (state, { payload: newTag }) => {
            let tags = [...state.tags];

            if (!tags.includes(newTag)) {
                tags = [...tags, newTag]
            }

            return {
                ...state,
                isWorking: false,
                error: "",
                tags
            }
        },
        fetchTagFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
        }),
        fetchArrayTagSuccess: (state, { payload: newTags }) => {
            let tags = [...state.tags];

            newTags.forEach(newTag => {
                if (!tags.includes(newTag)) {
                    tags = [...tags, newTag];
                }
            });

            return {
                ...state,
                isWorking: false,
                error: "",
                tags
            }
        },
        fetchArrayTagFailed: (state, { payload: message }) => ({
            ...state,
            isFetching: false,
            error: message
        }),
    }
});

export const {
    fetchTagsSuccess,
    fetchTagsFailed,
    fetchTagSuccess,
    fetchTagFailed,
    fetchArrayTagSuccess,
    fetchArrayTagFailed,
} = tagSlice.actions;

export const getState = state => state.tags;

export const getAllTags = createSelector(getState, (state) => state.tags);

export const getTagError = createSelector(getState, (state) => state.error);

export default tagSlice.reducer;

