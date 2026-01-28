import { useEffect, useRef } from 'react';

import { Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

import MovieNotAvailableSVG from '@/assets/images/movie-not-available.svg';
import { Card, TypographyH4 } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useMoviesInfiniteQuery } from '@/services';

import { Filters } from './Filters.container';

/**
 * Movies container
 *
 * Displays a list of movies fetched from the server with applied filters.
 * Filters can be selected via:
 * - A sidebar on desktop screens
 * - A modal dialog on mobile screens
 *
 * The component reads filter values from URL search parameters and
 * passes them to the movie query hook.
 */
export const Movies = () => {
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

    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];

            if (first.isIntersecting && hasNextPage) {
                void fetchNextPage();
            }
        });

        const currentSentinel = sentinelRef.current;

        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
                observer.disconnect();
            }
        };
    }, [fetchNextPage, hasNextPage]);

    return (
        <div className="h-180 overflow-y-auto [&::-webkit-scrollbar]:hidden flex flex-col md:flex-row gap-6 my-5 ">
            <div className="min-w-80 hidden md:block"></div>
            <aside className="hidden absolute  h-180 md:block min-h-[70vh] w-80">
                <Filters />
            </aside>

            <div className="md:hidden md:min-h-[70vh]">
                <Dialog>
                    <DialogTrigger className="fixed bottom-30 left-20" asChild>
                        <Button>
                            <Filter />
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="bg-accent md:hidden h-[60%] overflow-y-auto"
                        aria-description="filter"
                    >
                        <DialogHeader>
                            <DialogTitle>Filters</DialogTitle>
                            <DialogDescription>
                                Apply Filters for customize the Results
                            </DialogDescription>
                        </DialogHeader>

                        <Filters inModal />
                    </DialogContent>
                </Dialog>
            </div>
            <div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {!isLoadingMovies &&
                        movies?.pages
                            .flatMap((page) => page.results)
                            .map((movie) => (
                                <Link
                                    key={movie.id}
                                    to={`/movie/${movie.slug}`}
                                >
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
                    {!isLoadingMovies && !movies?.pages[0]?.results.length && (
                        <>
                            <div className="h-50 w-80">
                                <img
                                    src={MovieNotAvailableSVG}
                                    className="h-full w-full object-contain"
                                    alt="movie not available fallback"
                                />
                            </div>
                            <TypographyH4 className="text-center w-[70%]">
                                No Movies available for the applied Filter.
                                Please Change the Filter.
                            </TypographyH4>
                        </>
                    )}
                </div>
                {/* SENTINEL ELEMENT */}
                <div ref={sentinelRef} className="h-10 w-full" />
            </div>
        </div>
    );
};
