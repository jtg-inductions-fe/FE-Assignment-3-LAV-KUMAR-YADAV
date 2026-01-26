import { format } from 'date-fns';
import { Film } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';

import SlotsNotAvailableSvg from '@/assets/images/slots-not-available.svg';
import { SlotCard, TypographyH4 } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { TIME_FORMAT } from '@/constants';
import { useSlotsByCinemaQuery } from '@/services';

/**
 * CinemaSlots container
 *
 * Displays available movie slots for a selected cinema and date.
 *
 * @example
 * ```tsx
 * <CinemaSlots />
 * ```
 */

export const CinemaSlots = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const { data: movieSlots, isLoading: isMovieSlotsLoading } =
        useSlotsByCinemaQuery({
            cinema_id: id,
            date: searchParams.get('date') ?? undefined,
        });

    return (
        <div>
            {!isMovieSlotsLoading && !!movieSlots?.length && (
                <>
                    {movieSlots?.map((movie) => (
                        <div key={movie.id}>
                            <div className="h-px bg-border"></div>
                            <div className="flex flex-col  gap-6 py-4">
                                <div>
                                    <TypographyH4>
                                        <Film className="inline mr-2" />
                                        {movie.name}
                                    </TypographyH4>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {movie.slots.map((slot) => (
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
                                                    movie.languages.find(
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
                    <div className="h-px bg-border"></div>
                </>
            )}
            {isMovieSlotsLoading && (
                <>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`row${index}`}>
                            <div className="h-px bg-border"></div>
                            <div className="flex flex-col  gap-6 py-4">
                                <Skeleton className="w-100 h-8" />
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
            {!isMovieSlotsLoading && !movieSlots?.length && (
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <img
                            src={SlotsNotAvailableSvg}
                            alt="Slots not available fallback"
                        />
                    </div>
                    <TypographyH4 className="text-center">
                        No Slots Available for the selected Date. Please Change
                        the Date.
                    </TypographyH4>
                </div>
            )}
        </div>
    );
};
