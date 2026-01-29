export { api } from './api';

export {
    useLoginUserMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useRegisterUserMutation,
    useUpdateUserDetailsMutation,
    useUserDetailsQuery,
} from './userApi';

export {
    useGenresQuery,
    useLanguagesQuery,
    useLatestMoviesInfiniteQuery,
    useMovieQuery,
    useMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
    useSlotsByMovieSlugQuery,
} from './movieApi';

export {
    useCinemaQuery,
    useCinemasQuery,
    useSlotsByCinemaQuery,
    useLocationsQuery,
} from './cinemaApi';

export {
    useSlotDetailsQuery,
    useBookingMutation,
    useTicketsInfiniteQuery,
    usePastBookingsInfiniteQuery,
    useCancelTicketMutation,
} from './bookingApi';

export type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
    Genre,
    Language,
    Movie,
    PaginatedQueryResponse,
} from './services.types';
