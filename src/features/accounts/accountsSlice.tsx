import { createSlice } from '@reduxjs/toolkit';

export class User {
    name: string;
    mail: string;
    passwd: string;

    constructor(name: string, mail: string, passwd: string) {
        this.name = name;
        this.mail = mail;
        this.passwd = passwd;
    }
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        value: new Array(0)
    },
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
        },
        removeUser: (state, action) => {
            state.value.splice(action.payload);
        }
    }
});

export const { addUser } = accountsSlice.actions;

export const selectUsers = (state: any) => state.accounts.value;

export default accountsSlice.reducer;