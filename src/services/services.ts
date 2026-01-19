import { API_ROUTES } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    LoginRequest,
    LoginResponse,
    Movie,
    PaginatedQueryResponse,
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
                url: API_ROUTES.REGISTER_USER,
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
                url: API_ROUTES.LOGIN_USER,
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
        }),

        /**
         * Logs out the currently authenticated user.
         */
        logout: builder.mutation<void, void>({
            query: () => ({
                url: API_ROUTES.LOGOUT,
                method: 'POST',
                credentials: 'include',
            }),
        }),

        /**
         * Refreshes the access token using stored refresh credentials.
         */
        refreshToken: builder.mutation<{ access: string }, void>({
            query: () => ({
                url: API_ROUTES.REFRESH_TOKEN,
                method: 'POST',
                credentials: 'include',
            }),
        }),

        /**
         * Fetches the authenticated user's profile information.
         *
         * @param token - Current access token.
         */
        userDetails: builder.query<Omit<SignupResponse, 'access'>, string>({
            query: (token) => ({
                url: API_ROUTES.USER_PROFILE,
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
        }),

        /**
         * Retrieves paginated list of all movies.
         *
         * Supports infinite scrolling.
         */
        movies: builder.infiniteQuery<Movie[], void, number>({
            query: ({ pageParam }) => ({
                url: `${API_ROUTES.MOVIES}?page=${pageParam}`,
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (_, __, lastPageParam) => lastPageParam + 1,
            },
            transformResponse: (response: PaginatedQueryResponse<Movie>) =>
                response.results,
        }),

        /**
         * Retrieves paginated list of latest movies.
         *
         * Supports infinite scrolling.
         */
        latestMovies: builder.infiniteQuery<
            PaginatedQueryResponse<Movie>,
            void,
            number
        >({
            query: ({ pageParam }) => ({
                url: `${API_ROUTES.LATEST_MOVIES}?page=${pageParam}`,
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, __, lastPageParam) => {
                    if (lastPage.next) {
                        return lastPageParam + 1;
                    }
                },
            },
        }),

        /**
         * Retrieves paginated list of upcoming movies.
         *
         * Supports infinite scrolling.
         */
        upcomingMovies: builder.infiniteQuery<
            PaginatedQueryResponse<Movie>,
            void,
            number
        >({
            query: ({ pageParam }) => ({
                url: `${API_ROUTES.UPCOMING_MOVIES}?page=${pageParam}`,
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, __, lastPageParam) => {
                    if (lastPage.next) {
                        return lastPageParam + 1;
                    }
                },
            },
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
    useMoviesInfiniteQuery,
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
} = api;
