import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents authentication-related state for the application.
 */
type AuthType = {
    /**
     * Indicates whether the user is currently authenticated.
     */
    isAuthenticated: boolean;

    /**
     * Stores the current authentication access token.
     */
    token: string;

    /**
     * to keep user detail
     */
    user: {
        id: number;
        name: string;
        email: string;
        profile_pic?: string | null;
        phone_number?: string | null;
    } | null;
};

/**
 * Initial authentication state.
 */
const initialState: AuthType = {
    isAuthenticated: false,
    token: '',
    user: null,
};

/**
 * Redux slice responsible for authentication logic.
 *
 * Handles login, logout, and user state updates.
 */
export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        /**
         * Sets the current authenticated user information.
         */
        setUser: (state, action: PayloadAction<AuthType['user']>) => {
            state.user = action.payload;

            return state;
        },

        /**
         * Logs the user in by storing the access token and marking
         * the user as authenticated.
         */
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;

            return state;
        },

        /**
         * Logs the user out by clearing authentication data.
         */
        logout: (state) => {
            state.token = '';
            state.isAuthenticated = false;
            state.user = null;

            return state;
        },
    },
});

/**
 * Authentication actions.
 */
export const { setUser, login, logout } = authSlice.actions;
