import { Link, useSearchParams } from 'react-router';

import MovieNotAvailableSVG from '@/assets/images/movie-not-available.svg';
import { Card, TypographyH4 } from '@/components';
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
    } = useMoviesInfiniteQuery({
        languages: searchParams.get('languages') ?? undefined,
        genres: searchParams.get('genres') ?? undefined,
        slot_date: searchParams.get('slot_date') ?? undefined,
        cinema: searchParams.get('cinema') ?? undefined,
    });

    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-center">
                {!isLoadingMovies &&
                    movies?.pages
                        .flatMap((page) => page.results)
                        .map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.slug}`}>
                                <Card
                                    heading={movie.name}
                                    imageUrl={movie.movie_poster || ''}
                                    subheading={movie.genres
                                        .map((genre) => genre.genre)
                                        .join('/')}
                                    className="h-60 sm:h-80 w-75 sm:w-100"
                                />
                            </Link>
                        ))}

                {isLoadingMovies &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-60 sm:h-80 w-75 sm:w-100"
                        />
                    ))}
                {!isLoadingMovies && !movies?.pages?.[0]?.results?.length && (
                    <>
                        <div className="h-50 w-80">
                            <img
                                src={MovieNotAvailableSVG}
                                className="h-full w-full object-contain"
                                alt="movie not available fallback"
                            />
                        </div>
                        <TypographyH4 className="text-center w-[70%]">
                            No Movies available for the applied Filter. Please
                            Change the Filter.
                        </TypographyH4>
                    </>
                )}
            </div>
            {hasNextPage && (
                <div className="min-w-fit mx-auto mt-4">
                    <Button variant="link" onClick={() => void fetchNextPage()}>
                        See More
                    </Button>
                </div>
            )}
        </div>
    );
};
