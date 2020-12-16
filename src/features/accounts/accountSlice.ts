import { createSelector, createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        age: 0,
        desc: "",
        imageURL: "",
        mail: "",
        name: "",
        orientation: 0,
        tags: new Array<number>(0),
        town: "",
    },
    reducers: {
        addAge: (state, action) => {
            // The payload must be the age
            state.age = action.payload;
        },
        addDesc: (state, action) => {
            // The payload must be the description
            state.desc = action.payload
        },
        addPhoto: (state, action) => {
            // The payload must be the image URL
            state.imageURL = action.payload
        },
        addMail: (state, action) => {
            // The payload must be the email
            state.mail = action.payload;
        },
        addName: (state, action) => {
            // The payload must be the name
            state.name = action.payload;
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
        addCity: (state, action) => {
            // The payload must be the city
            state.town = action.payload;
        },
    }
});

export const { addMail, addName, addAge, addCity, addPrefs, addTag, removeTag, addDesc, addPhoto } = accountSlice.actions;

export const getState = state => state.account;

const getAge = createSelector(getState, (state) => state.age);
const getDesc = createSelector(getState, (state) => state.desc);
const getImageURL = createSelector(getState, (state) => state.imageURL);
export const getMail = createSelector(getState, (state) => state.mail);
const getName = createSelector(getState, (state) => state.name);
const getOrientation = createSelector(getState, (state) => state.orientation);
const getTags = createSelector(getState, (state) => state.tags);
const getTown = createSelector(getState, (state) => state.town);

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