import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";

export const createAccount = createAction(
  'CREATE-EMAIL_AUTH_REQUESTED',
  (params = {}) => ({
    payload: {
      request: {
        type: "createUserWithEmailAndPassword",
        params
      }
    }
  })
)
/**
 * Only used for type reference.
 * 
 * Must have this payload :
 * request: { type: "signInWithEmailAndPassword", email, passwd }
 */
export const loginAccount = createAction('LOGIN-EMAIL_AUTH_REQUESTED')
/**
 * Only used for type reference.
 * 
 * Must have this payload :
 * request: { type: "signOut" }
 */
export const logoutAccount = createAction('LOGIN-LOGOUT_AUTH_REQUESTED')
export const updateEmailAccount = createAction(
  'UPDATE-EMAIL_AUTH_REQUESTED',
  (params = {}) => ({
    payload: {
      request: {
        type: "updateEmail",
        email: params.email
      }
    }
  })
)
export const updatePasswordAccount = createAction(
  'UPDATE-PASSWORD_AUTH_REQUESTED',
  (params = {}) => ({
    payload: {
      request: {
        type: "updatePassword",
        passwd: params.passwd
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
  () => ({
    payload: {
      request: {
        type: "deleteProfile"
      }
    }
  })
)

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    new: {
      age: 0,
      desc: "",
      imageURL: "",
      mail: "",
      passwd: "",
      name: "",
      orientation: 0,
      gender: 0,
      tags: new Array<number>(0),
      town: "",
    },
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
    createAccountSuccess: (state) => ({
      ...state,
      isWorking: false,
      error: ""
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
      error: ""
    }),
    logoutAccountFailed: (state, { payload: message }) => ({
      ...state,
      isWorking: false,
      error: message
    }),
    updateEmailAccountSuccess: (state) => ({
      ...state,
      isWorking: false,
      error: ""
    }),
    updateEmailAccountFailed: (state, { payload: message }) => ({
      ...state,
      isWorking: false,
      error: message
    }),
    updatePasswordAccountSuccess: (state) => ({
      ...state,
      isWorking: false,
      error: ""
    }),
    updatePasswordAccountFailed: (state, { payload: message }) => ({
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

    addAge: (state, action) => {
      // The payload must be the age
      state.new.age = action.payload;
    },
    addDesc: (state, action) => {
      // The payload must be the description
      state.new.desc = action.payload;
    },
    addPhoto: (state, action) => {
      // The payload must be the image URL
      state.new.imageURL = action.payload;
    },
    addMail: (state, action) => {
      // The payload must be the email
      state.new.mail = action.payload;
    },
    addPasswd: (state, action) => {
      // The payload must be the passwd
      state.new.passwd = action.payload;
    },
    addName: (state, action) => {
      // The payload must be the name
      state.new.name = action.payload;
    },
    addPrefs: (state, action) => {
      // The payload must be the orientation
      state.new.orientation = action.payload;
    },
    addTag: (state, action) => {
      //The payload must be the Tag(s) ID to add
      state.new.tags.push(action.payload);
    },
    removeTag: (state, action) => {
      //The payload must be the Tag(s) ID to remove
      const removeTag = (id: number): void => {
        const index = state.new.tags.indexOf(id);
        if (index > -1) {
          state.new.tags.splice(index, 1);
        }
      };

      if (Array.isArray(action.payload)) {
        // If the payload is an array, remove each element
        for (let i = 0; i < action.payload.length; i++) {
          removeTag(action.payload[i]);
        }
      } else {
        removeTag(action.payload);
      }
    },
    addCity: (state, action) => {
      // The payload must be the city
      state.new.town = action.payload;
    },
    addGender: (state, action) => {
      // The payload must be the gender
      state.new.gender = action.payload;
    },
    setUid: (state, action) => {
      // The payload must be the uid
      state.uid = action.payload;
    },

    clearNewAccount: (state) => ({
      ...state,
      new: {
        age: 0,
        desc: "",
        imageURL: "",
        mail: "",
        passwd: "",
        name: "",
        orientation: 0,
        gender: 0,
        tags: new Array<number>(0),
        town: "",
      }
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
  addTag,
  removeTag,
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
  updateEmailAccountFailed,
  updateEmailAccountSuccess,
  updatePasswordAccountFailed,
  updatePasswordAccountSuccess,
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
const getGender = createSelector(getNewState, (state) => state.gender);

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
  (orientation, tags) => {
    return {
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
