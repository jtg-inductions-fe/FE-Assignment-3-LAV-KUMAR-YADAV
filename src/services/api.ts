import { API_ROUTES } from '@/constants';
import { authSlice } from '@/features';
import type { RootState } from '@/store';
import {
    type BaseQueryFn,
    createApi,
    type FetchArgs,
    fetchBaseQuery,
    type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

/**
 * List of RTK Query endpoint names that require authentication.
 * Only requests triggered by these endpoints will attach the
 * Authorization header and run refresh-token logic.
 */
const authEndpoints = [
    'userDetails',
    'updateUserDetails',
    'booking',
    'cancelTicket',
    'tickets',
    'pastBookings',
];

/**
 * Base RTK Query configuration.
 *
 * - Sets the API base URL
 * - Conditionally attaches the Authorization header
 *   only for endpoints that require authentication
 */
const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
    prepareHeaders(headers, { getState, endpoint }) {
        const state = getState() as RootState;
        const token = state.authReducer.token;

        if (authEndpoints.includes(endpoint) && token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

/**
 * Custom baseQuery wrapper that:
 * 1. Checks if the request requires authentication
 * 2. Validates access token existence and expiration
 * 3. Refreshes the token if missing or expired
 * 4. Retries the original request with the updated token
 */
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    /**
     * If the endpoint does not require authentication,
     * skip all auth-related logic and execute the request directly.
     */
    if (!authEndpoints.includes(api.endpoint)) {
        return await baseQuery(args, api, extraOptions);
    }

    /**
     * Helper function to refresh the access token.
     *
     * - Sends refresh-token request (cookies included)
     * - Stores the new access token in Redux state
     */
    const refresh = async () => {
        try {
            const refreshResult = await baseQuery(
                {
                    url: API_ROUTES.USERS.REFRESH_TOKEN,
                    method: 'POST',
                    credentials: 'include',
                },
                api,
                extraOptions,
            );
            const { access } = refreshResult.data as { access: string };
            api.dispatch(authSlice.actions.login(access));
        } catch {
            api.dispatch(authSlice.actions.logout());
        }
    };
    const token = (api.getState() as RootState).authReducer.token;
    if (!token) {
        await refresh();
    } else {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = atob(payloadBase64);
        const payload = JSON.parse(decodedPayload) as { exp: number };

        if (payload.exp - 30 < Math.floor(new Date().getTime() / 1000)) {
            await refresh();
        }
    }

    return await baseQuery(args, api, extraOptions);
};

/**
 * RTK Query API slice configuration for BookMyShow-related network requests.
 *
 * This API slice:
 * - Handles all server communication
 * - Manages caching and request lifecycle
 * - Supports automatic re-fetching via tag invalidation
 * - Integrates token refresh logic through a custom base query
 */
export const api = createApi({
    /**
     * Unique key used to store API cache in Redux store.
     */
    reducerPath: 'bookMyShowApi',

    /**
     * Base query configuration for all API requests.
     */
    baseQuery: baseQueryWithReauth,

    /**
     * Tags which can be used for invalidating the data
     */
    tagTypes: ['slotDetails', 'userDetails', 'tickets'],

    /**
     * API endpoint definitions.
     */
    endpoints: () => ({}),
});
