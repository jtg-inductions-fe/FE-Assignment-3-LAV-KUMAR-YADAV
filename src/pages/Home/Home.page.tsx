import { ErrorBoundary } from '@/components';
import { ErrorFallback, Home as HomeContainer } from '@/containers';

/**
 * Home page.
 *
 * Displays the main movie discovery experience including:
 *
 * Upcoming movies carousel
 * Latest movies carousel
 */
export const Home = () => (
    <ErrorBoundary fallback={<ErrorFallback />}>
        <HomeContainer />
    </ErrorBoundary>
);
