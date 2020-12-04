import { createSlice } from "@reduxjs/toolkit";

/*export class User {
    name: string;
    mail: string;
    passwd: string;

    constructor(name: string, mail: string, passwd: string) {
        this.name = name;
        this.mail = mail;
        this.passwd = passwd;
    }
}*/

export interface User {
  name: string;
  mail: string;
  passwd: string;
}

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    value: new Array<User>(),
  },
  reducers: {
    addUser: (state, action) => {
      const user: User = action.payload;
      state.value.push(user);
    },
    removeUser: (state, action) => {
      const id: number = action.payload;
      state.value.splice(id);
    },
  },
});

export const { addUser } = accountsSlice.actions;

export const selectUsers = (state: any): User[] => state.accounts.value;

export default accountsSlice.reducer;
