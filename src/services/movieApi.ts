import { format } from 'date-fns';

import { API_ROUTES, DATE_FORMAT_ISO } from '@/constants';

import { api } from './api';
import type {
    Genre,
    Language,
    Movie,
    PaginatedQueryResponse,
    SlotsByMovieSlugResponse,
} from './services.types';

/**
 * Movie-related API endpoints.
 *
 * This module injects endpoints into the base RTK Query API
 * for handling:
 * - Movie listings with filters and pagination
 * - Movie details retrieval
 * - Latest and upcoming movies
 * - Languages and genres metadata
 * - Slot and cinema details for a specific movie
 */
const movieApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
         * Retrieves all the slots of a particular movie along with cinema their cinema Details
         */
        slotsByMovieSlug: builder.query<
            SlotsByMovieSlugResponse[],
            { slug: string; date?: string }
        >({
            query: ({ slug, date }) => ({
                url: `/movies/${slug}/movie-slots/`,
                params: {
                    date: date ? date : format(new Date(), DATE_FORMAT_ISO),
                },
            }),
        }),
    }),
});

export const {
    useMoviesInfiniteQuery,
    useMovieQuery,
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
    useGenresQuery,
    useLanguagesQuery,
    useSlotsByMovieSlugQuery,
} = movieApi;
