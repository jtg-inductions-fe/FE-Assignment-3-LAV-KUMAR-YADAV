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
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    NOT_FOUND: '*',
    MOVIES: '/movies',
    MOVIE: '/movie/:slug',
    MOVIE_SLOTS: '/movie/:slug/slots',
    BOOKING: '/booking/:slotId',
    CINEMAS: '/cinemas',
    CINEMA: '/cinema/:id',
    PROFILE: '/profile',
} as const;
