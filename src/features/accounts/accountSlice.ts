import { createSelector, createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        mail: "",
        age: 0,
        name: "",
        tags: new Array<number>(0),
        orientation: 0,
        town: "",
        imageURL: "",
        desc: ""
    },
    reducers: {
        addMail: (state, action) => {
            // The payload must be the email
            state.mail = action.payload;
        },
        addName: (state, action) => {
            // The payload must be the name
            state.name = action.payload;
        },
        addAge: (state, action) => {
            // The payload must be the age
            state.age = action.payload;
        },
        addCity: (state, action) => {
            // The payload must be the city
            state.town = action.payload;
        },
        addPrefs: (state, action) => {
            // The payload must be the orientation
            state.orientation = action.payload;
        },
        addTag: (state, action) => {
            //The payload must be the Tag(s) ID to add
            state.tags.push(action.payload);
        },
        removeTag: (state, action) => {
            //The payload must be the Tag(s) ID to remove
            const removeTag = (id: number): void => {
                const index = state.tags.indexOf(id);
                if (index > -1) {
                    state.tags.splice(index, 1);
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
        addDesc: (state, action) => {
            // The payload must be the description
            state.desc = action.payload
        },
        addPhoto: (state, action) => {
            // The payload must be the image URL
            state.imageURL = action.payload
        }
    }
});

export const { addMail, addName, addAge, addCity, addPrefs, addTag, removeTag, addDesc, addPhoto } = accountSlice.actions;

export const getState = state => state.account;

export const getMail = createSelector(getState, (state) => state.mail);
const getAge = createSelector(getState, (state) => state.age);
const getName = createSelector(getState, (state) => state.name);
const getTags = createSelector(getState, (state) => state.tags);
const getOrientation = createSelector(getState, (state) => state.orientation);
const getTown = createSelector(getState, (state) => state.town);
const getImageURL = createSelector(getState, (state) => state.imageURL);
const getDesc = createSelector(getState, (state) => state.desc);

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