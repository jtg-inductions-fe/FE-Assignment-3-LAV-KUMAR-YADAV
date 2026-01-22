import { Movies as MoviesContainer } from '@/containers';

/**
 * Displays a list of movies fetched from the server with applied filters. Filters can be selected via:
 * - A sidebar on desktop screens
 * - A modal dialog on mobile screens
 *
 * The component reads filter values from URL search parameters and passes them to the movie query hook.
 */
export const Movies = () => <MoviesContainer />;
