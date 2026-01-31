import { API_ROUTES } from '@/constants';

import { api } from './api';
import type {
    PaginatedQueryResponse,
    SeatBookingRequest,
    SlotDetails,
    Ticket,
} from './services.types';

/**
 * Booking-related API endpoints.
 *
 * This module injects endpoints into the base RTK Query API
 * for handling:
 * - Slot details retrieval
 * - Seat booking
 * - Ticket cancellation
 * - Active tickets pagination
 * - Past bookings pagination
 */
const bookingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Retrieves all the details of a particular slot by its id
         */
        slotDetails: builder.query<SlotDetails, { id: string }>({
            query: ({ id }) => ({
                url: `${API_ROUTES.BOOKINGS.SLOT_DETAILS}${id}/`,
            }),
            providesTags: ['slotDetails'],
        }),

        /**
         * To book the seats
         */
        booking: builder.mutation<{ message: string }, SeatBookingRequest>({
            query: (data) => ({
                url: API_ROUTES.BOOKINGS.BOOKING,
                body: data,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * To Cancel a ticket
         */
        cancelTicket: builder.mutation<{ message: string }, number | string>({
            query: (id) => ({
                url: `${API_ROUTES.BOOKINGS.CANCEL}${id}/`,
                method: 'PATCH',
                credentials: 'include',
            }),
            invalidatesTags: ['slotDetails', 'tickets'],
        }),

        /**
         * To retrieve all tickets
         */
        tickets: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            void,
            number
        >({
            query: ({ pageParam }) => ({
                url: API_ROUTES.BOOKINGS.TICKETS,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
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
         * To retrieve all past bookings
         */
        pastBookings: builder.infiniteQuery<
            PaginatedQueryResponse<Ticket>,
            void,
            number
        >({
            query: ({ pageParam }) => ({
                url: API_ROUTES.BOOKINGS.HISTORY,
                params: {
                    page: pageParam,
                },
                credentials: 'include',
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
    useSlotDetailsQuery,
    useBookingMutation,
    useTicketsInfiniteQuery,
    usePastBookingsInfiniteQuery,
    useCancelTicketMutation,
} = bookingApi;
