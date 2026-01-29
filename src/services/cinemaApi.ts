import { format } from 'date-fns';

import { API_ROUTES, DATE_FORMAT_ISO } from '@/constants';

import { api } from './api';
import type { Cinema, Location, SlotByCinemaResponse } from './services.types';

/**
 * Cinema-related API endpoints.
 *
 * This module injects endpoints into the base RTK Query API
 * for handling:
 * - List of Cinema Retrieval
 * - Cinema details retrieval
 * - Slots by cinema id retrieval
 * - Location list retrieval
 */
const cinemaApi = api.injectEndpoints({
    endpoints: (builder) => ({
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
            { cinema_id: string; date?: string }
        >({
            query: ({ cinema_id, date }) => ({
                url: `/cinemas/${cinema_id}/movie-slots/`,
                params: {
                    date: date ? date : format(new Date(), DATE_FORMAT_ISO),
                },
            }),
        }),

        /**
         * Retrieves all locations
         */
        locations: builder.query<Location[], void>({
            query: () => ({
                url: API_ROUTES.CINEMAS.LOCATION,
            }),
        }),
    }),
});

export const {
    useCinemasQuery,
    useCinemaQuery,
    useSlotsByCinemaQuery,
    useLocationsQuery,
} = cinemaApi;
