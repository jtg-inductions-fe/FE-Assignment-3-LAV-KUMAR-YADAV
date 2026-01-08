import { createBrowserRouter } from 'react-router';

import { RootLayout } from '@/layouts';
import { Home, Login, NotFound, SignUp } from '@/pages';

/**
 * Application router configuration using react-router's createBrowserRouter.
 *
 * Defines the route hierarchy for the web app:
 * - The root path '/' uses the RootLayout component as the layout wrapper.
 * - The index route (default child of '/') renders the Dashboard component.
 * - Any unmatched route ('*') renders the NotFound component to handle 404s.
 */
export const router = createBrowserRouter([
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
