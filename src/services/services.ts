import { format } from 'date-fns';

import { API_ROUTES, DATE_FORMAT_ISO } from '@/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    Cinema,
    Genre,
    Language,
    Location,
    LoginRequest,
    LoginResponse,
    Movie,
    PaginatedQueryResponse,
    SeatBookingRequest,
    SignupRequest,
    SignupResponse,
    SlotByCinemaResponse,
    SlotDetails,
    SlotsByMovieSlugResponse,
    Ticket,
    UpdateProfileRequest,
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
     * Tags which can be used for invalidating the data
     */
    tagTypes: ['slotDetails', 'userDetails', 'tickets'],

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
         * @param token - Current access token.
         */
        userDetails: builder.query<Omit<SignupResponse, 'access'>, string>({
            query: (token) => ({
                url: API_ROUTES.USERS.PROFILE,
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            providesTags: ['userDetails'],
        }),

        /**
         * Updates the user details
         */
        updateUserDetails: builder.mutation<
            Omit<SignupRequest, 'password'>,
            { token?: string; data: UpdateProfileRequest }
        >({
            query: ({ token, data }) => ({
                url: API_ROUTES.USERS.UPDATE_PROFILE,
                body: getFormData(data),
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                method: 'PATCH',
            }),
            invalidatesTags: ['userDetails'],
        }),

        /**
         * Retrieves paginated list of all movies.
         *
         * Supports infinite scrolling.
         */
        movies: builder.infiniteQuery<
            PaginatedQueryResponse<Movie>,
            {
                languages?: string;
                genres?: string;
                cinema?: string;
                slot_date?: string;
            },
            number
        >({
            query: ({ pageParam, queryArg }) => ({
                url: API_ROUTES.MOVIES.LIST,
                params: {
                    page: pageParam,
                    ...queryArg,
                },
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
         * Retrieve a particular movie based on the movie slug
         */
        movie: builder.query<Movie, { slug: string }>({
            query: ({ slug }) => ({
                url: `${API_ROUTES.MOVIES.MOVIE}${slug}/`,
            }),
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
                url: API_ROUTES.MOVIES.LATEST,
                params: {
                    page: pageParam,
                },
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
                url: API_ROUTES.MOVIES.UPCOMING,
                params: {
                    page: pageParam,
                },
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

        /***
         * Retrieves all the languages
         */
        languages: builder.query<Language[], void>({
            query: () => ({
                url: API_ROUTES.MOVIES.LANGUAGES,
            }),
        }),

        /**
         * Retrieves all Genres
         */
        genres: builder.query<Genre[], void>({
            query: () => ({
                url: API_ROUTES.MOVIES.GENRES,
            }),
        }),

        /**
         * Retrieve all cinemas
         */
        cinemas: builder.query<Cinema[], { location?: string }>({
            query: ({ location }) => ({
                url: API_ROUTES.CINEMAS.LIST,
                params: {
                    location,
                },
            }),
        }),

        /**
         * Retrieve A Single Cinema based on id
         */
        cinema: builder.query<Cinema, { id: string }>({
            query: ({ id }) => ({
                url: `${API_ROUTES.CINEMAS.CINEMA}${id}/`,
            }),
        }),

        /**
         * Retrieves all the slots of a particular cinema including movie
         */
        slotsByCinema: builder.query<
            SlotByCinemaResponse[],
            { cinema_id?: string; date?: string }
        >({
            query: ({ cinema_id, date }) => ({
                url: `/cinemas/${cinema_id}/movie-slots/`,
                params: {
                    date: date ? date : format(new Date(), DATE_FORMAT_ISO),
                },
            }),
        }),

        /**
         * Retrieves all the slots of a particular movie along with cinema their cinema Details
         */
        slotsByMovieSlug: builder.query<
            SlotsByMovieSlugResponse[],
            { slug: string; date?: string }
        >({
            query: ({ slug, date }) => ({
                url: `/movies/${slug}/movie-slots/`,
                params: {
                    date: date ? date : new Date().toISOString().slice(0, 10),
                },
            }),
        }),

        /**
         * Retrieves all the details of a particular slot by it's id
         */
        slotDetails: builder.query<SlotDetails, { id: string }>({
            query: ({ id }) => ({
                url: `${API_ROUTES.BOOKINGS.SLOT_DETAILS}${id}/`,
            }),
            providesTags: ['slotDetails'],
        }),

        /**
         * Retrieves all locations
         */
        locations: builder.query<Location[], void>({
            query: () => ({
                url: API_ROUTES.CINEMAS.LOCATION,
            }),
        }),

        /**
         * To book the seats
         */
        booking: builder.mutation<
            { message: string },
            { data: SeatBookingRequest; token: string }
        >({
            query: ({ data, token }) => ({
                url: API_ROUTES.BOOKINGS.BOOKING,
                body: data,
                method: 'POST',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * To Cancel a ticket
         */
        cancelTicket: builder.mutation<
            { message: string },
            { token: string; id: number | string }
        >({
            query: ({ token, id }) => ({
                url: `${API_ROUTES.BOOKINGS.CANCEL}${id}/`,
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * TO retrieve all tickets
         */
        tickets: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            { token: string },
            number
        >({
            query: ({ pageParam, queryArg }) => ({
                url: API_ROUTES.BOOKINGS.TICKETS,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${queryArg.token}`,
                },
            }),
            infiniteQueryOptions: {
                initialPageParam: 1,
                getNextPageParam: (lastPage, __, lastPageParam) => {
                    if (lastPage.next) {
                        return lastPageParam + 1;
                    }
                },
            },
            providesTags: ['tickets'],
        }),

        /**
         * TO retrieve all past bookings
         */
        pastBookings: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            { token: string },
            number
        >({
            query: ({ pageParam, queryArg }) => ({
                url: API_ROUTES.BOOKINGS.HISTORY,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
                headers: {
                    authorization: `Bearer ${queryArg.token}`,
                },
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
    useMovieQuery,
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
    useGenresQuery,
    useLanguagesQuery,
    useCinemasQuery,
    useCinemaQuery,
    useLocationsQuery,
    useSlotsByCinemaQuery,
    useSlotsByMovieSlugQuery,
    useSlotDetailsQuery,
    useBookingMutation,
    useUpdateUserDetailsMutation,
    useTicketsInfiniteQuery,
    usePastBookingsInfiniteQuery,
    useCancelTicketMutation,
} = api;
