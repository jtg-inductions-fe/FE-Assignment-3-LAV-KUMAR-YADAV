import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { AuthGuard, ErrorFallback } from '@/containers';
import { RootLayout } from '@/layouts';
import {
    Booking,
    Cinema,
    Cinemas,
    Home,
    Login,
    Movie,
    Movies,
    MovieSlots,
    NotFound,
    Profile,
    SignUp,
} from '@/pages';

/**
 * Application router configuration using react-router's createBrowserRouter.
 *
 * Defines the route hierarchy for the web app:
 * - The root path '/' uses the RootLayout component as the layout wrapper.
 * - The index route (default child of '/') renders the Home component.
 * - Any unmatched route ('*') renders the NotFound component to handle 404s.
 */
export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: (
            <AuthGuard>
                <RootLayout />
            </AuthGuard>
        ),
        errorElement: <ErrorFallback />,
        children: [
            {
                index: true,
                element: <Home />,
                id: ROUTES.HOME,
            },
            {
                path: ROUTES.PUBLIC.SIGNUP,
                id: ROUTES.PUBLIC.SIGNUP,
                element: <SignUp />,
            },
            {
                path: ROUTES.PUBLIC.LOGIN,
                id: ROUTES.PUBLIC.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.MOVIES,
                id: ROUTES.MOVIES,
                element: <Movies />,
            },
            {
                path: ROUTES.MOVIE,
                id: ROUTES.MOVIE,
                element: <Movie />,
            },
            {
                path: ROUTES.MOVIE_SLOTS,
                id: ROUTES.MOVIE_SLOTS,
                element: <MovieSlots />,
            },
            {
                path: ROUTES.CINEMAS,
                id: ROUTES.CINEMAS,
                element: <Cinemas />,
            },
            {
                path: ROUTES.CINEMA,
                id: ROUTES.CINEMA,
                element: <Cinema />,
            },
            {
                path: ROUTES.PROTECTED.BOOKING,
                id: ROUTES.PROTECTED.BOOKING,
                element: <Booking />,
            },
            {
                path: ROUTES.PROTECTED.PROFILE,
                id: ROUTES.PROTECTED.PROFILE,
                element: <Profile />,
            },
            {
                path: ROUTES.NOT_FOUND,
                id: ROUTES.NOT_FOUND,
                element: <NotFound />,
            },
        ],
    },
]);
