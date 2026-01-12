import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AuthType = {
    isAuthenticated: boolean;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        profile_pic?: string | null;
        phone_number?: string | null;
    } | null;
};
const initialState: AuthType = {
    isAuthenticated: false,
    token: '',
    user: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthType['user']>) => {
            state.user = action.payload;

            return state;
        },
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            return state;
        },
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            state.user = null;

            return state;
        },
    },
});

export const { setUser, login, logout } = authSlice.actions;
