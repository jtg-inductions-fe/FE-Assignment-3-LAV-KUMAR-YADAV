import { API_ROUTES } from '@/constants';
import { getFormData } from '@/lib';

import { api } from './api';
import type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
    UpdateProfileRequest,
} from './services.types';

/**
 * User authentication and profile-related API endpoints.
 *
 * This module injects endpoints into the base RTK Query API
 * for handling:
 * - User registration and login
 * - Logout and token refresh
 * - Fetching and updating user profile information
 */
const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Registers a new user.
         *
         * Accepts multipart/form-data to support profile image uploads.
         */
        registerUser: builder.mutation<SignupResponse, SignupRequest>({
            query: (data) => ({
                url: API_ROUTES.USERS.REGISTER,
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
                url: API_ROUTES.USERS.LOGIN,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['userDetails'],
        }),

        /**
         * Logs out the currently authenticated user.
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_ROUTES.USERS.LOGOUT,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['userDetails'],
        }),

        /**
         * Refreshes the access token using stored refresh credentials.
         */
        refreshToken: builder.mutation<{ access: string }, void>({
            query: () => ({
                url: API_ROUTES.USERS.REFRESH_TOKEN,
                method: 'POST',
                credentials: 'include',
            }),
        }),

        /**
         * Fetches the authenticated user's profile information.
         *
         */
        userDetails: builder.query<Omit<SignupResponse, 'access'>, void>({
            query: () => ({
                url: API_ROUTES.USERS.PROFILE,
                credentials: 'include',
            }),
            providesTags: ['userDetails'],
        }),

        /**
         * Updates the user details
         */
        updateUserDetails: builder.mutation<
            Omit<SignupRequest, 'password'>,
            UpdateProfileRequest
        >({
            query: (data) => ({
                url: API_ROUTES.USERS.UPDATE_PROFILE,
                body: getFormData(data),
                credentials: 'include',
                method: 'PATCH',
            }),
            invalidatesTags: ['userDetails'],
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
    useUpdateUserDetailsMutation,
} = userApi;
