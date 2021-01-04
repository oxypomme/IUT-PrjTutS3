import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const createAccount = createAction(
    'CREATE-EMAIL_AUTH_REQUESTED',
    () => ({
        payload: {
            request: {
                type: "createUserWithEmailAndPassword",
            }
        }
    })
);

export const loginAccount = (email: string, passwd: string, onComplete?: (args?: unknown) => void) => ({
    type: loginAccount.type,
    payload: {
        request: {
            type: "signInWithEmailAndPassword",
            email,
            passwd
        }
    },
    onComplete
});
loginAccount.type = "LOGIN-EMAIL_AUTH_REQUESTED";

export const logoutAccount = (onComplete?: (args?: unknown) => void) => ({
    type: logoutAccount.type,
    payload: {
        request: {
            type: "signOut"
        }
    },
    onComplete
});
logoutAccount.type = "LOGIN-LOGOUT_AUTH_REQUESTED";

export const updateEmailAccount = createAction(
    'UPDATE-EMAIL_AUTH_REQUESTED',
    (email: string) => ({
        payload: {
            request: {
                type: "updateEmail",
                params: email
            }
        }
    })
);
export const updatePasswordAccount = createAction(
    'UPDATE-PASSWORD_AUTH_REQUESTED',
    (passwd: string) => ({
        payload: {
            request: {
                type: "updatePassword",
                params: passwd
            }
        }
    })
)
export const resetPasswordAccount = createAction(
    'RESET-PASSWORD_AUTH_REQUESTED',
    (params = {}) => ({
        payload: {
            request: {
                type: "sendPasswordResetEmail",
                email: params.email,
                actionCodeSettings: null
            }
        }
    })
)
export const deleteAccount = createAction(
    'DELETE_AUTH_REQUESTED',
    (params = {}) => ({
        payload: {
            request: {
                type: "deleteProfile",
                params
            }
        }
    })
)

const initialNewAccount = {
    age: -1,
    desc: "",
    imageURL: "",
    mail: "",
    passwd: "",
    name: "",
    orientation: -1,
    sex: -1,
    tags: new Array<number>(0),
    town: "",
};

export const accountSlice = createSlice({
    name: "account",
    initialState: {
        new: initialNewAccount,
        uid: "",
        isWorking: false,
        error: ""
    },
    extraReducers: {
        [createAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [loginAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [logoutAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [updateEmailAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [updatePasswordAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [resetPasswordAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
        [deleteAccount.type]: (state) => ({
            ...state,
            isWorking: true,
            error: ""
        }),
    },
    reducers: {
        createAccountSuccess: (state, { payload: uid }) => ({
            ...state,
            isWorking: false,
            error: "",
            uid
        }),
        createAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        loginAccountSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        loginAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        logoutAccountSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: "",
            uid: ""
        }),
        logoutAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        updateAccountSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        updateAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        resetPasswordAccountSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        resetPasswordAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),
        deleteAccountSuccess: (state) => ({
            ...state,
            isWorking: false,
            error: ""
        }),
        deleteAccountFailed: (state, { payload: message }) => ({
            ...state,
            isWorking: false,
            error: message
        }),

        addAge: (state, { payload: age }) => ({
            ...state,
            eror: "",
            new: { ...state.new, age }
        }),
        addDesc: (state, { payload: desc }) => ({
            ...state,
            eror: "",
            new: { ...state.new, desc }
        }),
        addPhoto: (state, { payload: imageURL }) => ({
            ...state,
            eror: "",
            new: { ...state.new, imageURL }
        }),
        addMail: (state, { payload: mail }) => ({
            ...state,
            eror: "",
            new: { ...state.new, mail }
        }),
        addPasswd: (state, { payload: passwd }) => ({
            ...state,
            eror: "",
            new: { ...state.new, passwd }
        }),
        addName: (state, { payload: name }) => ({
            ...state,
            eror: "",
            new: { ...state.new, name }
        }),
        addPrefs: (state, { payload: orientation }) => ({
            ...state,
            eror: "",
            new: { ...state.new, orientation }
        }),
        addTags: (state, { payload: tags }) => ({
            ...state,
            eror: "",
            new: { ...state.new, tags }
        }),
        addCity: (state, { payload: town }) => ({
            ...state,
            eror: "",
            new: { ...state.new, town }
        }),
        addGender: (state, { payload: sex }) => ({
            ...state,
            eror: "",
            new: { ...state.new, sex }
        }),
        setUid: (state, { payload: uid }) => ({
            ...state,
            eror: "",
            uid
        }),

        clearNewAccount: (state) => ({
            ...state,
            new: initialNewAccount
        }),
    },
});

export const {
    addMail,
    addPasswd,
    addName,
    addAge,
    addCity,
    addPrefs,
    addTags,
    addDesc,
    addPhoto,
    addGender,
    setUid,
    clearNewAccount,

    createAccountFailed,
    createAccountSuccess,
    loginAccountFailed,
    loginAccountSuccess,
    logoutAccountSuccess,
    logoutAccountFailed,
    updateAccountFailed,
    updateAccountSuccess,
    resetPasswordAccountFailed,
    resetPasswordAccountSuccess,
    deleteAccountFailed,
    deleteAccountSuccess,
} = accountSlice.actions;

export const getNewState = state => state.account.new;

const getAge = createSelector(getNewState, (state) => state.age);
const getDesc = createSelector(getNewState, (state) => state.desc);
const getImageURL = createSelector(getNewState, (state) => state.imageURL);
export const getMail = createSelector(getNewState, (state) => state.mail);
const getPasswd = createSelector(getNewState, (state) => state.passwd);
const getName = createSelector(getNewState, (state) => state.name);
const getOrientation = createSelector(getNewState, (state) => state.orientation);
const getTags = createSelector(getNewState, (state) => state.tags);
const getTown = createSelector(getNewState, (state) => state.town);
const getGender = createSelector(getNewState, (state) => state.sex);

export const getState = state => state.account;

export const getAuthId = createSelector(getState, (state) => state.uid);
export const getIsConnected = createSelector(
    getState,
    (state) => state.uid !== ""
);

export const getNewAuth = createSelector(
    getMail,
    getPasswd,
    (email, passwd) => ({
        email,
        passwd
    }));

export const getPersonalInfos = createSelector(
    getName,
    getAge,
    getTown,
    (name, age, town) => {
        return {
            name,
            age,
            town,
        };
    }
);

export const getPrefsInfos = createSelector(
    getGender,
    getOrientation,
    getTags,
    (sex, orientation, tags) => {
        return {
            sex,
            orientation,
            tags,
        };
    }
);

export const getPublicInfos = createSelector(
    getImageURL,
    getDesc,
    (imageURL, desc) => {
        return {
            imageURL,
            desc,
        };
    }
);

export const getInfos = createSelector(
    getPersonalInfos,
    getPrefsInfos,
    getPublicInfos,
    (persInfos, prefsInfo, publicInfos) => ({ ...persInfos, ...prefsInfo, ...publicInfos })
);

export const getAccountError = createSelector(getState, (state) => state.error)

export default accountSlice.reducer;
