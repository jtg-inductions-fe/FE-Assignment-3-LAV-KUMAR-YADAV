import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Represents authentication-related state for the application.
 */
type AuthType = {
    /**
     * Stores the current authentication access token.
     */
    token: string;
};

/**
 * Initial authentication state.
 */
const initialState: AuthType = {
    token: '',
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
         * Logs the user in by storing the access token and marking
         * the user as authenticated.
         */
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;

            return state;
        },

        /**
         * Logs the user out by clearing authentication data.
         */
        logout: (state) => {
            state.token = '';

            return state;
        },
    },
});

/**
 * Authentication actions.
 */
export const { login, logout } = authSlice.actions;
