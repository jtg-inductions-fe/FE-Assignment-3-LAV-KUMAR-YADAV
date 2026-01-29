import { format } from 'date-fns';
import { Film } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router';

import SlotsNotAvailableSvg from '@/assets/illustrations/slots-not-available.svg';
import { SlotCard, StatusFallback, TypographyH4 } from '@/components';
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
        useSlotsByCinemaQuery(
            {
                cinema_id: id!,
                date: searchParams.get('date') ?? undefined,
            },
            {
                skip: !id,
            },
        );

    return (
        <div>
            {!isMovieSlotsLoading && !!movieSlots?.length && (
                <>
                    {movieSlots?.map((movie) => (
                        <div key={movie.id}>
                            <div className="bg-border h-px"></div>
                            <div className="flex flex-col gap-6 py-4">
                                <div>
                                    <TypographyH4>
                                        <Film className="mr-2 inline" />
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
                    <div className="bg-border h-px"></div>
                </>
            )}
            {isMovieSlotsLoading && (
                <>
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={`row${index}`}>
                            <div className="bg-border h-px"></div>
                            <div className="flex flex-col gap-6 py-4">
                                <Skeleton className="h-8 w-100" />
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
            {!isMovieSlotsLoading && !movieSlots?.length && (
                <StatusFallback
                    illustration={SlotsNotAvailableSvg}
                    content="No Slots Available for the selected date. Please Change
                        the date."
                    heading="No Slots"
                />
            )}
        </div>
    );
};
