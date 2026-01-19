import { authSlice } from '@/features/authSlice';
import { api } from '@/services';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

/**
 * Global Redux store configuration.
 *
 * Combines application reducers and sets up middleware
 * including RTK Query's API middleware.
 */
export const store = configureStore({
    /**
     * Root reducer configuration.
     */
    reducer: {
        /**
         * Authentication state reducer.
         */
        authReducer: authSlice.reducer,

        /**
         * RTK Query API cache reducer.
         */
        [api.reducerPath]: api.reducer,
    },

    /**
     * Store middleware configuration.
     *
     * Adds RTK Query middleware for caching, invalidation,
     * polling, and automatic refetch behaviors.
     */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

/**
 * Represents the complete Redux state tree of the application.
 *
 * This type is inferred automatically from the store configuration.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Dispatch type for the Redux store.
 *
 * Used to strongly type the `dispatch` function throughout the app.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Enables advanced RTK Query behaviors such as:
 * - refetchOnFocus
 * - refetchOnReconnect
 *
 * Should be called once after store creation.
 */
setupListeners(store.dispatch);
