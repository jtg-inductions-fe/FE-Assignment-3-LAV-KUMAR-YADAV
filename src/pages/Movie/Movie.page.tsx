import { ErrorBoundary } from '@/components';
import { ErrorFallback, Movie as MovieContainer } from '@/containers';
/**
 * This page will show all the available information of the movie
 */
export const Movie = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <MovieContainer />
    </ErrorBoundary>
);
