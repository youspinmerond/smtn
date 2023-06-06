import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/User";

interface IInitial {
    user: null | IUser;
}
const initialState: IInitial = {
    user: null
}

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state: any, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        cleanUser: (state) => {
            state.user = null;
        },
    },
});

export const { changeUser, cleanUser } = slice.actions;
export default slice.reducer;