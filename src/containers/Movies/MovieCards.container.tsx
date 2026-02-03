import { Link, useSearchParams } from 'react-router';

import MovieNotAvailableSVG from '@/assets/illustrations/movie-not-available.svg';
import { Card, StatusFallback } from '@/components';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoviesInfiniteQuery } from '@/services';

/**
 * MoviesCards component
 *
 * Displays a grid of movie cards based on applied filter criteria.
 *
 * @example
 * ```tsx
 * <MoviesCards />
 * ```
 */

export const MoviesCards = () => {
    const [searchParams] = useSearchParams();
    const {
        data: movies,
        fetchNextPage,
        hasNextPage,
        isLoading: isLoadingMovies,
        isFetchingNextPage: isFetchingMoviesNextPage,
    } = useMoviesInfiniteQuery({
        languages: searchParams.get('languages') ?? undefined,
        genres: searchParams.get('genres') ?? undefined,
        slot_date: searchParams.get('slot_date') ?? undefined,
        cinema: searchParams.get('cinema') ?? undefined,
    });

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4">
                {!isLoadingMovies &&
                    movies?.pages
                        .flatMap((page) => page.results)
                        .map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.slug}`}>
                                <Card
                                    heading={movie.name}
                                    imageUrl={
                                        movie.movie_poster ||
                                        MovieNotAvailableSVG
                                    }
                                    subheading={movie.genres
                                        .map((genre) => genre.genre)
                                        .join('/')}
                                    className="h-60 w-75 sm:h-80 sm:w-100"
                                />
                            </Link>
                        ))}

                {isLoadingMovies &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-60 w-75 sm:h-80 sm:w-100"
                        />
                    ))}
                {!isLoadingMovies && !movies?.pages?.[0]?.results?.length && (
                    <div className="flex justify-center">
                        <StatusFallback
                            heading="No Results"
                            content="No Movies available for the applied Filter. Please
                            Change the Filter."
                            illustration={MovieNotAvailableSVG}
                        />
                    </div>
                )}
            </div>
            {hasNextPage && (
                <div className="mx-auto mt-4 min-w-fit">
                    <Button
                        variant="link"
                        onClick={() => void fetchNextPage()}
                        disabled={isFetchingMoviesNextPage}
                    >
                        {isFetchingMoviesNextPage ? 'Loading...' : 'See More'}
                    </Button>
                </div>
            )}
        </div>
    );
};
