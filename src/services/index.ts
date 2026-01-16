export {
    useLoginUserMutation,
    useRegisterUserMutation,
    api,
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
    useLocationsQuery,
} from './services';

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
