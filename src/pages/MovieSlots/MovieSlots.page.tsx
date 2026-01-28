import { ErrorBoundary } from '@/components';
import { ErrorFallback, MovieSlots as MovieSlotsContainer } from '@/containers';

/**
 *
 *  A Page which shows all the cinemas with their slots of a particular movie with movie details
 */
export const MovieSlots = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <MovieSlotsContainer />
    </ErrorBoundary>
);
