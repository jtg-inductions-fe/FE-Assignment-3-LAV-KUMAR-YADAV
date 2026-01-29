import { useEffect, useState } from 'react';

import { Navigate, useMatches } from 'react-router';

import { ROUTES } from '@/constants';
import { login } from '@/features';
import { useRefreshTokenMutation } from '@/services';
import { useAppDispatch, useAppSelector } from '@/store';

import type { AuthGuardProps } from './AuthGuard.types';

/**
 * AuthGuard component
 *
 * Route-level guard responsible for handling authentication state and
 * access control for public and protected routes.
 *
 * Behavior:
 * - Attempts to refresh the access token if none is present
 * - Redirects unauthenticated users away from protected routes
 * - Redirects authenticated users away from public routes (e.g. login)
 * - Renders children once authentication state is resolved
 *
 * @example
 * ```tsx
 * <AuthGuard>
 *   <ProtectedPage />
 * </AuthGuard>
 * ```
 */

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const matches = useMatches();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTokenMutate] = useRefreshTokenMutation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.authReducer.token);

    const currentRouteId = matches[matches.length - 1]?.id ?? '';
    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await refreshTokenMutate().unwrap();
                const { access } = response;
                dispatch(login(access));
            } finally {
                setIsLoading(false);
            }
        };
        if (!token) {
            void refreshToken();
        } else {
            setIsLoading(false);
        }
    }, [dispatch, refreshTokenMutate, token]);

    const isProtected = Object.values(ROUTES.PROTECTED).includes(
        currentRouteId,
    );
    const isPublic = Object.values(ROUTES.PUBLIC).includes(currentRouteId);

    if (!isProtected && !isPublic) {
        return children;
    } else if (
        !token &&
        !isLoading &&
        Object.values(ROUTES.PROTECTED).includes(currentRouteId)
    ) {
        return <Navigate to={ROUTES.PUBLIC.LOGIN} replace />;
    } else if (
        token &&
        !isLoading &&
        Object.values(ROUTES.PUBLIC).includes(currentRouteId)
    ) {
        return <Navigate to={ROUTES.HOME} replace />;
    } else if (!isLoading) {
        return children;
    }

    return null;
};
