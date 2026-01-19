import { Card, TypographyH3 } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib';
import {
    useLatestMoviesInfiniteQuery,
    useUpcomingMoviesInfiniteQuery,
} from '@/services';

/**
 * Home page container.
 *
 * Displays the main movie discovery experience including:
 * - Upcoming movies carousel
 * - Latest movies carousel
 *
 * Supports infinite loading for both movie lists.
 */
export const Home = () => {
    const {
        data: latestMovies,
        fetchNextPage: SeeMoreLatestMovies,
        hasNextPage: hasNextLatestMovies,
    } = useLatestMoviesInfiniteQuery();
    const {
        data: upcomingMovies,
        fetchNextPage: SeeMoreUpcomingMovies,
        hasNextPage: hasNextUpcomingMovies,
    } = useUpcomingMoviesInfiniteQuery();

    return (
        <div className="gap-8 flex flex-col items-center">
            <section
                className={cn(
                    'my-4 w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:[95%] 2xl:w-[98%]',
                )}
                aria-labelledby="upcoming-movies"
            >
                <div className="flex justify-between ">
                    <TypographyH3 id="upcoming-movies">
                        Upcoming Movies
                    </TypographyH3>
                    <Button
                        variant="ghost"
                        onClick={() => void SeeMoreUpcomingMovies()}
                        disabled={!hasNextUpcomingMovies}
                    >
                        See More
                    </Button>
                </div>
                <div className="flex justify-center w-full">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {upcomingMovies?.pages
                                .flatMap((page) => page.results)
                                .map((movie, index) => (
                                    <CarouselItem key={index}>
                                        <Card
                                            heading={movie.name}
                                            imageUrl={movie.movie_poster || ''}
                                            subheading={movie.genres
                                                .map((genre) => genre.genre)
                                                .join('/')
                                                .slice(0, 60)}
                                            className="h-60 sm:h-80 w-75 sm:w-100"
                                        />
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>

            <section
                className={cn(
                    'my-4 w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:[95%] 2xl:w-[98%]',
                )}
                aria-labelledby="latest-movies"
            >
                <div className="flex justify-between">
                    <TypographyH3 id="latest-movies">
                        Latest Movies
                    </TypographyH3>
                    <Button
                        variant="ghost"
                        onClick={() => void SeeMoreLatestMovies()}
                        disabled={!hasNextLatestMovies}
                    >
                        See More
                    </Button>
                </div>
                <div className="flex justify-center w-full">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {latestMovies?.pages
                                .flatMap((page) => page.results)
                                .map((movie, index) => (
                                    <CarouselItem key={index}>
                                        <Card
                                            heading={movie.name}
                                            imageUrl={movie.movie_poster || ''}
                                            subheading={movie.genres
                                                .map((genre) => genre.genre)
                                                .join('/')
                                                .slice(0, 60)}
                                            className="h-60 sm:h-80 w-75 sm:w-100"
                                        />
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </section>
        </div>
    );
};

// w-[75%] sm:w-[80%] md:w-[85%] lg:w-[90%] xl:[95%] 2xl:[98%]
