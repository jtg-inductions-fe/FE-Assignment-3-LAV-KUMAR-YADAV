import { Link } from 'react-router';

import MovieNotAvailableSVG from '@/assets/images/movie-not-available.svg';
import { Card, TypographyH2, TypographyH4 } from '@/components';
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
            <div className="flex justify-between">
                <TypographyH2 id="latest-movies">Latest Movies</TypographyH2>
                <Button
                    variant="ghost"
                    onClick={() => void seeMoreLatestMovies()}
                    disabled={!hasNextLatestMovies}
                    aria-disabled={!hasNextLatestMovies}
                >
                    See More Movies
                </Button>
            </div>
            <div className="flex justify-center w-full">
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
                                                    .join('/')
                                                    .slice(0, 60)}
                                                className="h-60 sm:h-80 w-75 sm:w-100"
                                            />
                                        </Link>
                                    </CarouselItem>
                                ))}
                        {isLatestMovieLoading &&
                            Array.from({ length: 6 }).map((_, index) => (
                                <CarouselItem key={index} aria-hidden>
                                    <Skeleton className="h-60 sm:h-80 w-75 sm:w-100 rounded-xl" />
                                </CarouselItem>
                            ))}
                        {!isLatestMovieLoading &&
                            !latestMovies?.pages[0]?.results?.length && (
                                <CarouselItem>
                                    <div>
                                        <img
                                            src={MovieNotAvailableSVG}
                                            alt="Latest Movies Not Available fallback"
                                        />
                                    </div>
                                    <TypographyH4>
                                        No Latest Movies Available
                                    </TypographyH4>
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
