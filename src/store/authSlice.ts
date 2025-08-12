import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
    id: string;
    name: string;
    email: string;
    gender: string;
    birth: string;
}

const initialState: Profile = {
    id: '',
    name: '',
    email: '',
    gender: '',
    birth: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Profile>) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;