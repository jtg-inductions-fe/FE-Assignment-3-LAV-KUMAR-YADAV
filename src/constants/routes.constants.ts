/**
 * Centralized application route definitions.
 *
 * This object serves as the single source of truth for all route paths for react router
 * used throughout the application. Using these constants ensures
 * consistency, prevents hard-coded strings, enables safer refactoring,
 * and improves IDE autocomplete support.
 *
 */
export const ROUTES = {
    PUBLIC: {
        LOGIN: '/login',
        SIGNUP: '/signup',
    },
    PROTECTED: {
        PROFILE: '/profile',
        BOOKING: '/booking/:slotId',
    },
    HOME: '/',
    NOT_FOUND: '*',
    MOVIES: '/movies',
    MOVIE: '/movie/:slug',
    MOVIE_SLOTS: '/movie/:slug/slots',
    CINEMAS: '/cinemas',
    CINEMA: '/cinema/:id',
};
