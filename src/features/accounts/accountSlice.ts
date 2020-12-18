import { createSelector, createSlice } from "@reduxjs/toolkit";

export interface IError {
  component: string;
  label: string;
}

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    new: {
      age: 0,
      desc: "",
      imageURL: "",
      mail: "",
      name: "",
      orientation: 0,
      tags: new Array<number>(0),
      town: "",
    },
    uid: ""
  },
  reducers: {
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
    setConnected: (state, action) => {
      // The payload must be the uid
      state.uid = action.payload;
    },
  },
});

export const {
  addMail,
  addName,
  addAge,
  addCity,
  addPrefs,
  addTag,
  removeTag,
  addDesc,
  addPhoto,
  setConnected,
} = accountSlice.actions;

export const getNewState = state => state.account.new;

const getAge = createSelector(getNewState, (state) => state.age);
const getDesc = createSelector(getNewState, (state) => state.desc);
const getImageURL = createSelector(getNewState, (state) => state.imageURL);
export const getMail = createSelector(getNewState, (state) => state.mail);
const getName = createSelector(getNewState, (state) => state.name);
const getOrientation = createSelector(getNewState, (state) => state.orientation);
const getTags = createSelector(getNewState, (state) => state.tags);
const getTown = createSelector(getNewState, (state) => state.town);

export const getState = state => state.account;

export const getAuthId = createSelector(getState, (state) => state.uid);
export const getConnection = createSelector(
  getState,
  (state) => state.uid !== ""
);

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

export default accountSlice.reducer;
