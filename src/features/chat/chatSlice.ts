import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

import IMessage from "../../include/IMessage";

export const newMessage = createAction(
    "CREATE_MESSAGE_REQUESTED",
    (message: IMessage, params = {}) => ({
        payload: {
            request: {
                type: "create",
                url: "/messages",
                params: {
                    data: message,
                    ...params
                }
            }
        }
    })
);

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        inMessages: {},
        outMessages: {},
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [newMessage.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        })
    },
    reducers: {
        syncInMessagesSuccess: (state, { payload: messages }) => ({
            ...state,
            isWorking: false,
            error: "",
            inMessages: messages
        }),
        syncOutMessagesSuccess: (state, { payload: messages }) => ({
            ...state,
            isWorking: false,
            error: "",
            outMessages: messages
        }),
        syncMessagesFailed: (state, { payload: error }) => ({
            ...state,
            isWorking: false,
            error
        }),
        createMessageSuccess: state => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        createMessageFailed: (state, { payload: error }) => ({
            ...state,
            isWorking: false,
            error
        }),
    }
});

export const {
    syncInMessagesSuccess,
    syncOutMessagesSuccess,
    syncMessagesFailed,
    createMessageSuccess,
    createMessageFailed
} = chatSlice.actions;

export const getState = state => state.chat;

export const getInChat = createSelector(getState, state => state.inMessages);
export const getOutChat = createSelector(getState, state => state.outMessages);
export const getChats = createSelector(
    getInChat,
    getOutChat,
    (inChats, outChats) => ({
        ...inChats,
        ...outChats
    })
);

export const getChatError = createSelector(getState, state => state.error);

export default chatSlice.reducer;