import { Link } from 'react-router';

import MovieNotAvailableSVG from '@/assets/illustrations/movie-not-available.svg';
import { Card, StatusFallback, TypographyH2 } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib';
import { useLatestMoviesInfiniteQuery } from '@/services';

/**
 * LatestMovies component
 *
 * Displays a carousel of the latest movies available on the platform.
 *
 * @example
 * ```tsx
 * <LatestMovies />
 * ```
 */

export const LatestMovies = () => {
    const {
        data: latestMovies,
        fetchNextPage: seeMoreLatestMovies,
        hasNextPage: hasNextLatestMovies,
        isLoading: isLatestMovieLoading,
    } = useLatestMoviesInfiniteQuery();

    return (
        <section
            className={cn(
                'my-4 w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:w-[95%] 2xl:w-[98%]',
            )}
            aria-labelledby="latest-movies"
        >
            <div className="mb-5 flex justify-between">
                <TypographyH2 id="latest-movies">Latest Movies</TypographyH2>
                <Button
                    variant="ghost"
                    onClick={() => void seeMoreLatestMovies()}
                    disabled={!hasNextLatestMovies}
                >
                    See More Movies
                </Button>
            </div>
            <div className="flex w-full justify-center">
                <Carousel
                    className="w-full"
                    aria-label="Latest movies carousel"
                >
                    <CarouselContent>
                        {!isLatestMovieLoading &&
                            latestMovies?.pages
                                .flatMap((page) => page.results)
                                .map((movie, index, arr) => (
                                    <CarouselItem
                                        key={movie.id}
                                        aria-label={`Slide ${index + 1} of ${arr.length}`}
                                    >
                                        <Link
                                            to={`/movie/${movie.slug}`}
                                            aria-label={`View details for ${movie.name}`}
                                        >
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
                                    </CarouselItem>
                                ))}
                        {isLatestMovieLoading &&
                            Array.from({ length: 6 }).map((_, index) => (
                                <CarouselItem key={index} aria-hidden>
                                    <Skeleton className="h-60 w-75 rounded-xl sm:h-80 sm:w-100" />
                                </CarouselItem>
                            ))}
                        {!isLatestMovieLoading &&
                            !latestMovies?.pages[0]?.results?.length && (
                                <CarouselItem>
                                    <StatusFallback
                                        content="No Latest Movies Available"
                                        illustration={MovieNotAvailableSVG}
                                        heading="No Worries"
                                    />
                                </CarouselItem>
                            )}
                    </CarouselContent>
                    <CarouselPrevious aria-label="Show previous movie" />
                    <CarouselNext aria-label="Show next movie" />
                </Carousel>
            </div>
        </section>
    );
};
