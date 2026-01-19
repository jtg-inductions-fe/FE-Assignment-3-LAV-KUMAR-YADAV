import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { router } from '@/router';
import { store } from '@/store';

import { Toaster } from './components/ui/sonner';

import './index.css';

/**
 * Application bootstrap entry point.
 *
 * Responsible for:
 * - Creating the React root
 * - Enabling React Strict Mode
 * - Providing the Redux store
 * - Initializing the application router
 * - Registering the global toast notification system
 */
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
        </Provider>
        ,
    </StrictMode>,
);
