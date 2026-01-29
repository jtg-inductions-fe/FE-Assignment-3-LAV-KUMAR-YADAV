import { LatestMovies } from './LatestMovies.container';
import { UpcomingMovies } from './UpcomingMovies.container';

/**
 * Home container
 *
 * Serves as the landing page of the application.
 *
 * @example
 * ```tsx
 * <Home />
 * ```
 */

export const Home = () => (
    <div className="flex flex-col items-center gap-8">
        <UpcomingMovies />
        <LatestMovies />
    </div>
);
