import { createBrowserRouter } from 'react-router';

import { ROUTES } from '@/constants';
import { RootLayout } from '@/layouts';
import {
    Cinema,
    Cinemas,
    Home,
    Login,
    Movie,
    Movies,
    MovieSlots,
    NotFound,
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
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: ROUTES.SIGNUP,
                element: <SignUp />,
            },
            {
                path: ROUTES.LOGIN,
                element: <Login />,
            },
            {
                path: ROUTES.MOVIES,
                element: <Movies />,
            },
            {
                path: ROUTES.MOVIE,
                element: <Movie />,
            },
            {
                path: ROUTES.MOVIE_SLOTS,
                element: <MovieSlots />,
            },
            {
                path: ROUTES.CINEMAS,
                element: <Cinemas />,
            },
            {
                path: ROUTES.CINEMA,
                element: <Cinema />,
            },
            {
                path: ROUTES.NOT_FOUND,
                element: <NotFound />,
            },
        ],
    },
]);
