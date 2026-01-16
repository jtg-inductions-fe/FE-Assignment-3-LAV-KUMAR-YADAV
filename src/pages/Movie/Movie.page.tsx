import { Dot } from 'lucide-react';
import { useParams } from 'react-router';

import { TypographyH1, TypographyH3, TypographyP } from '@/components';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useMovieQuery } from '@/services';

/**
 * Movie Component
 *
 * Displays detailed information about a single movie including:
 * - Poster image
 * - Title
 * - Duration
 * - Genres
 * - Release date
 * - Description
 *
 * The component retrieves the movie slug from the URL parameters
 * and fetches the corresponding movie details using a query hook.
 *
 * A visually rich hero section is rendered with the movie poster
 * as a background image combined with a dark gradient overlay.
 *
 */
export const Movie = () => {
    const { slug } = useParams();
    const { data: movie, isLoading: isMovieLoading } = useMovieQuery({
        slug: slug,
    });

    return (
        <div className="my-4">
            {!isMovieLoading && movie && (
                <section
                    className="bg-cover bg-center h-125 flex flex-col sm:flex-row gap-4 sm:items-center p-6 "
                    aria-labelledby="movie-name"
                    style={{
                        backgroundImage: movie?.movie_poster
                            ? `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${movie.movie_poster})`
                            : undefined,
                    }}
                >
                    <div className="h-60 sm:h-80 w-80 sm:w-120">
                        <img
                            src={movie?.movie_poster || ''}
                            alt={`${movie?.name} poster`}
                            className="h-full w-full rounded-2xl object-cover"
                        />
                    </div>
                    <div>
                        <TypographyH1
                            className="text-primary-foreground"
                            id="movie-name"
                        >
                            {movie?.name}
                        </TypographyH1>
                        <TypographyP className="text-primary-foreground">
                            {movie?.duration}
                            <Dot className="inline" />
                            {movie?.genres
                                .map(
                                    (genre) =>
                                        genre.genre[0].toUpperCase() +
                                        genre.genre.slice(1),
                                )
                                .join(', ')}
                            <Dot className="inline" />
                            {movie?.release_date
                                ? new Date(movie?.release_date).toDateString()
                                : ''}
                        </TypographyP>
                        <Button>Book Tickets</Button>
                    </div>
                </section>
            )}
            {isMovieLoading && <Skeleton className="h-125 w-full" />}
            {!isMovieLoading && movie && (
                <section aria-labelledby="about" className="my-6">
                    <TypographyH1 id="about">About The Movie</TypographyH1>
                    <TypographyP>{movie?.description}</TypographyP>
                </section>
            )}
            {isMovieLoading && (
                <section>
                    <TypographyH1 id="about">About The Movie</TypographyH1>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-full mt-2" />
                    ))}
                </section>
            )}

            {!isMovieLoading && !movie && (
                <TypographyH3 className="text-center">
                    Movie Not Found
                </TypographyH3>
            )}
        </div>
    );
};
