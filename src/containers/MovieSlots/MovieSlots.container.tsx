import { format } from 'date-fns';
import { MapPin, TvMinimal } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';

import SlotsNotAvailableSvg from '@/assets/illustrations/slots-not-available.svg';
import {
    DatePicker,
    SlotCard,
    StatusFallback,
    TypographyH1,
    TypographyH4,
    TypographyP,
} from '@/components';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TIME_FORMAT } from '@/constants';
import { capitalizeFirstCharacter } from '@/lib';
import { useMovieQuery, useSlotsByMovieSlugQuery } from '@/services';

/**
 * MovieSlots container
 *
 * Displays all available cinema slots for a specific movie.
 *
 * @example
 * ```tsx
 * <MovieSlots />
 * ```
 */

export const MovieSlots = () => {
    const { slug } = useParams();
    const { data: movie, isLoading: isMovieLoading } = useMovieQuery(
        {
            slug: slug || '',
        },
        {
            skip: !slug,
        },
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: movieSlots, isLoading: isSlotsLoading } =
        useSlotsByMovieSlugQuery(
            {
                slug: slug || '',
                date: searchParams.get('date') ?? undefined,
            },
            {
                skip: !slug,
            },
        );

    return (
        <div className="my-6 flex flex-col gap-4">
            {!isMovieLoading && movie && (
                <div className="flex flex-col items-center gap-6 md:flex-row">
                    <div className="h-40 w-80 sm:h-50 sm:w-100">
                        <img
                            src={movie?.movie_poster ?? ''}
                            alt={`${movie?.name} Poster`}
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>
                    <div className="self-start md:w-2/3">
                        <TypographyH1>{movie?.name}</TypographyH1>
                        <Badge variant="secondary" className="text-sm">
                            Movie Runtime: {movie?.duration}
                        </Badge>
                        <div className="mt-2 flex flex-wrap gap-4">
                            {movie?.genres.map((genre) => (
                                <Badge
                                    key={genre.id}
                                    variant="secondary"
                                    className="text-sm"
                                >
                                    {capitalizeFirstCharacter(genre.genre)}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isMovieLoading && (
                <div className="flex flex-col gap-6 md:flex-row">
                    <Skeleton className="h-50 w-90" />
                    <div className="md:w-2/3">
                        <Skeleton className="h-10 w-100" />
                        <Skeleton className="h-7 w-30" />
                        <div className="mt-2 flex flex-wrap gap-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-7 w-20" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <DatePicker
                selected={
                    searchParams.get('date')
                        ? new Date(searchParams.get('date')!)
                        : new Date()
                }
                onDateChange={(date) => {
                    searchParams.delete('date');
                    if (date) {
                        searchParams.append('date', format(date, 'yyyy-MM-dd'));
                    }
                    setSearchParams(searchParams);
                }}
            />
            {!isSlotsLoading && !!movieSlots?.length && (
                <>
                    {movieSlots?.map((cinema) => (
                        <div key={cinema.id}>
                            <div className="bg-border h-px"></div>
                            <div className="flex flex-col gap-6 py-4">
                                <div className="flex gap-4">
                                    <TypographyH4>
                                        <TvMinimal className="mr-2 inline" />
                                        {cinema.name}
                                    </TypographyH4>
                                    <TypographyP>
                                        <MapPin className="inline" />
                                        {capitalizeFirstCharacter(
                                            cinema.location.location,
                                        )}
                                    </TypographyP>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {cinema.slots.map((slot) => (
                                        <Link
                                            to={`/booking/${slot.id}`}
                                            key={slot.id}
                                        >
                                            <SlotCard
                                                price={slot.price}
                                                time={format(
                                                    slot.date_time,
                                                    TIME_FORMAT,
                                                )}
                                                language={
                                                    movie?.languages.find(
                                                        (language) =>
                                                            language.id ===
                                                            slot.language,
                                                    )?.language || ''
                                                }
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-border h-px"></div>
                </>
            )}

            {isSlotsLoading && (
                <>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`row${index}`}>
                            <div className="bg-border h-px"></div>
                            <div className="flex flex-col gap-6 py-4">
                                <div className="flex gap-4">
                                    <Skeleton className="h-10 w-30" />
                                    <Skeleton className="h-7 w-30" />
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {Array.from({ length: 6 }).map(
                                        (__, idx) => (
                                            <Skeleton
                                                key={`row${index}col${idx}`}
                                                className="h-18 w-40 rounded-xl"
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-border h-px"></div>
                </>
            )}

            {!isSlotsLoading && !movieSlots?.length && (
                <StatusFallback
                    illustration={SlotsNotAvailableSvg}
                    content="No Slots Available on the selected date. Please Change
                        the date."
                    heading="No Slots"
                />
            )}
        </div>
    );
};
