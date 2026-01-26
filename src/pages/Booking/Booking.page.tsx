import { ErrorBoundary } from '@/components';
import { Booking as BookingContainer, ErrorFallback } from '@/containers';

/**
 * Booking page that displays seat information and handles seat booking.
 *
 */
export const Booking = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <BookingContainer />
    </ErrorBoundary>
);
