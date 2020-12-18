import { createSelector, createSlice } from '@reduxjs/toolkit';

export interface IError { component: string, label: string; }
export const accountSlice = createSlice({
    name: 'account',
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
            state.new.desc = action.payload
        },
        addPhoto: (state, action) => {
            // The payload must be the image URL
            state.new.imageURL = action.payload
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
            }

            if (Array.isArray(action.payload)) {
                // If the payload is an array, remove each element
                for (let i = 0; i < action.payload.length; i++) {
                    removeTag(action.payload[i]);
                }
            }
            else {
                removeTag(action.payload)
            }

        },
        addCity: (state, action) => {
            // The payload must be the city
            state.new.town = action.payload;
        },
        setConnected: (state, action) => {
            // The payload must be the uid
            state.uid = action.payload;
        }
    }
});

export const { addMail, addName, addAge, addCity, addPrefs, addTag, removeTag, addDesc, addPhoto, setConnected } = accountSlice.actions;

export const getState = state => state.account;

const getAge = createSelector(getState, (state) => state.new.age);
const getDesc = createSelector(getState, (state) => state.new.desc);
const getImageURL = createSelector(getState, (state) => state.new.imageURL);
export const getMail = createSelector(getState, (state) => state.new.mail);
const getName = createSelector(getState, (state) => state.new.name);
const getOrientation = createSelector(getState, (state) => state.new.orientation);
const getTags = createSelector(getState, (state) => state.new.tags);
const getTown = createSelector(getState, (state) => state.new.town);

export const getAuthId = createSelector(getState, (state) => state.uid);
export const getConnection = createSelector(getState, (state) => state.uid !== "")

export const getPersonalInfos = createSelector(
    getName,
    getAge,
    getTown,
    (name, age, town) => {
        return {
            name: name,
            age: age,
            town: town
        };
    }
);

export const getPrefsInfos = createSelector(
    getOrientation,
    getTags,
    (orientation, tags) => {
        return {
            orientation: orientation,
            tags: tags
        };
    }
);

export const getPublicInfos = createSelector(
    getImageURL,
    getDesc,
    (imageURL, desc) => {
        return {
            imageURL: imageURL,
            desc: desc
        };
    }
);

export const getInfos = createSelector(
    getPersonalInfos,
    getPrefsInfos,
    getPublicInfos,
    (persInfos, prefsInfo, publicInfos) => {
        return { ...persInfos, ...prefsInfo, ...publicInfos };
    }
)

export default accountSlice.reducer;