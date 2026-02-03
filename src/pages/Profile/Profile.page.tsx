import { ErrorBoundary } from '@/components';
import { ErrorFallback, Profile as ProfileContainer } from '@/containers';

/**
 *
 *  A page where profile details, user tickets, and past bookings are shown.
 */
export const Profile = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <ProfileContainer />
    </ErrorBoundary>
);
