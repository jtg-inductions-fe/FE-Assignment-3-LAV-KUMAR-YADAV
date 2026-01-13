import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
} from './services.types';

/**
 * Converts a plain object into FormData.
 *
 * Used primarily for multipart/form-data requests such as
 * user registration with file uploads.
 */
const getFormData = (object: Record<string, string | File | undefined>) =>
    Object.keys(object).reduce((formData, key) => {
        if (object[key]) {
            formData.append(key, object[key]);
        }

        return formData;
    }, new FormData());

/**
 * RTK Query API instance for handling authentication-related requests.
 *
 * Provides endpoints for:
 * - User registration
 * - User login
 *
 * Automatically generates React hooks for usage within components.
 */
export const api = createApi({
    /**
     * Unique key used to store API cache in Redux store.
     */
    reducerPath: 'bookMyShowApi',

    /**
     * Base query configuration for all API requests.
     */
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),

    /**
     * API endpoint definitions.
     */
    endpoints: (builder) => ({
        /**
         * Registers a new user.
         *
         * Accepts multipart/form-data to support profile image uploads.
         */
        registerUser: builder.mutation<SignupResponse, SignupRequest>({
            query: (data) => ({
                url: 'users/register/',
                method: 'POST',
                body: getFormData(data),
                credentials: 'include',
            }),
        }),

        /**
         * Logs in an existing user.
         *
         * Accepts JSON credentials and returns authentication tokens.
         */
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: 'users/login/',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'users/logout/',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        refreshToken: builder.mutation<{ access: string }, void>({
            query: () => ({
                url: 'users/refresh/',
                method: 'POST',
                credentials: 'include',
            }),
        }),
        userDetails: builder.query<Omit<SignupResponse, 'access'>, string>({
            query: (token) => ({
                url: 'users/profile/',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
} = api;
