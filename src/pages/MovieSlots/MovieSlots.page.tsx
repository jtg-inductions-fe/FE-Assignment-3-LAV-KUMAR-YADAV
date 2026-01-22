import { format } from 'date-fns';
import { MapPin, TvMinimal } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';

import SlotsNotAvailableSvg from '@/assets/images/slots-not-available.svg';
import {
    DatePicker,
    SlotCard,
    TypographyH1,
    TypographyH4,
    TypographyP,
} from '@/components';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useMovieQuery } from '@/services';
import { useSlotsByMovieSlugQuery } from '@/services/services';

/**
 * A page which shows all the cinemas with their slots of a particular movie with movie details
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
                <div className="flex flex-col items-center md:flex-row gap-6">
                    <div className="h-40 w-80 sm:h-50 sm:w-100">
                        <img
                            src={movie?.movie_poster ?? ''}
                            alt={`${movie?.name} Poster`}
                            className="h-full w-full object-cover rounded-xl"
                        />
                    </div>
                    <div className="md:w-2/3 self-start">
                        <TypographyH1>{movie?.name}</TypographyH1>
                        <Badge variant="secondary" className="text-sm ">
                            Movie Runtime: {movie?.duration}
                        </Badge>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {movie?.genres.map((genre) => (
                                <Badge
                                    key={genre.id}
                                    variant="secondary"
                                    className="text-sm "
                                >
                                    {genre.genre[0].toUpperCase() +
                                        genre.genre.slice(1)}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {isMovieLoading && (
                <div className="flex flex-col md:flex-row gap-6">
                    <Skeleton className="h-50 w-90" />
                    <div className="md:w-2/3">
                        <Skeleton className="h-10 w-100" />
                        <Skeleton className="h-7 w-30" />
                        <div className="flex flex-wrap gap-4 mt-2">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-7 w-20" />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <DatePicker
                selected={new Date(searchParams.get('date') || new Date())}
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
                            <div className="h-px bg-border"></div>
                            <div className="flex flex-col  gap-6 py-4">
                                <div className="flex gap-4">
                                    <TypographyH4>
                                        <TvMinimal className="inline mr-2" />
                                        {cinema.name}
                                    </TypographyH4>
                                    <TypographyP>
                                        <MapPin className="inline " />
                                        {cinema.location.location[0].toUpperCase() +
                                            cinema.location.location.slice(1)}
                                    </TypographyP>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {cinema.slots.map((slot) => (
                                        <SlotCard
                                            key={slot.id}
                                            price={slot.price}
                                            time={format(
                                                slot.date_time,
                                                'hh:mm a',
                                            )}
                                            language={
                                                movie?.languages.filter(
                                                    (language) =>
                                                        language.id ===
                                                        slot.language,
                                                )[0]?.language || ''
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="h-px bg-border"></div>
                </>
            )}

            {isSlotsLoading && (
                <>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`row${index}`}>
                            <div className="h-px bg-border"></div>
                            <div className="flex flex-col  gap-6 py-4">
                                <div className="flex gap-4">
                                    <Skeleton className="w-30 h-10" />
                                    <Skeleton className="w-30 h-7" />
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {Array.from({ length: 6 }).map(
                                        (__, idx) => (
                                            <Skeleton
                                                key={`row${index}col${idx}`}
                                                className="w-40 h-18 rounded-xl"
                                            />
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="h-px bg-border"></div>
                </>
            )}

            {!isSlotsLoading && !movieSlots?.length && (
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <img
                            src={SlotsNotAvailableSvg}
                            alt="Slots not available fallback"
                        />
                    </div>
                    <TypographyH4>
                        No Slots Available on the selected date. Please Change
                        the date.
                    </TypographyH4>
                </div>
            )}
        </div>
    );
};
