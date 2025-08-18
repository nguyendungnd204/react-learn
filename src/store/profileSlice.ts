import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../types/userProfile";

interface UserProfileState {
  profile: UserProfile | null;
}

const initialState: UserProfileState = {
  profile: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
      setProfile: (state, action: PayloadAction<UserProfile | null>) => {
        state.profile = action.payload;
      },
    }
})

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
