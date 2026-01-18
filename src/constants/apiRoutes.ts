/**
 * API_ROUTES
 *
 * Centralized collection of backend API endpoint paths used throughout the application.
 * These routes are grouped by feature domain for better organization and maintainability.
 *
 * Declared as `const` to ensure strict literal typing and prevent accidental modification.
 */
export const API_ROUTES = {
    /**
     * Routes related to user authentication and profile management.
     */
    USERS: {
        /**
         * Endpoint for registering a new user account.
         */
        REGISTER: '/users/register/',

        /**
         * Endpoint for user login authentication.
         */
        LOGIN: '/users/login/',

        /**
         * Endpoint for logging out the currently authenticated user.
         */
        LOGOUT: '/users/logout/',

        /**
         * Endpoint for refreshing an expired authentication token.
         */
        REFRESH_TOKEN: '/users/refresh/',

        /**
         * Endpoint for retrieving  the current user's profile information.
         */
        PROFILE: '/users/profile/',
    },

    /**
     * Routes related to movie data and metadata.
     */
    MOVIES: {
        /**
         * Endpoint for retrieving a list of all movies.
         */
        LIST: '/movies/',

        /**
         * Endpoint for fetching the latest released movies.
         */
        LATEST: '/movies/latest/',

        /**
         * Endpoint for fetching upcoming movies.
         */
        UPCOMING: '/movies/upcoming/',

        /**
         * Endpoint for retrieving available movie genres.
         */
        GENRES: '/movies/genres/',

        /**
         * Endpoint for retrieving available movie languages.
         */
        LANGUAGES: '/movies/languages/',
    },

    /**
     * Routes related to cinema information.
     */
    CINEMAS: {
        /**
         * Endpoint for retrieving a list of cinemas.
         */
        LIST: '/cinemas/',

        /**
         * Locations of cinemas
         */
        LOCATION: '/cinemas/locations/',
    },
} as const;
