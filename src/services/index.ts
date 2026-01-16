export {
    useLoginUserMutation,
    useRegisterUserMutation,
    api,
    useLogoutMutation,
    useRefreshTokenMutation,
    useUserDetailsQuery,
    useMoviesInfiniteQuery,
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
    useGenresQuery,
    useLanguagesQuery,
    useCinemasQuery,
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
