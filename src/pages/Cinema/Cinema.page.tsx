import { format } from 'date-fns';
import { Film, MapPin } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';

import {
    DatePicker,
    SlotCard,
    TypographyH1,
    TypographyH4,
    TypographyP,
} from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { useCinemaQuery, useSlotsByCinemaQuery } from '@/services';

/**
 * A page which shows all the movies with their slots in a particular cinema with cinema location
 */
export const Cinema = () => {
    const { id } = useParams();
    const { data: cinema, isLoading: isCinemaLoading } = useCinemaQuery({ id });
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: movieSlots, isLoading: isMovieSlotsLoading } =
        useSlotsByCinemaQuery({
            cinema_id: id,
            date: searchParams.get('date') ?? undefined,
        });

    return (
        <div className="my-6 flex flex-col gap-4">
            {!isCinemaLoading && cinema && (
                <>
                    <TypographyH1>{cinema?.name}</TypographyH1>
                    <TypographyP>
                        <MapPin className="inline mr-2" />
                        {cinema?.location.location}
                    </TypographyP>
                </>
            )}
            {isCinemaLoading && (
                <>
                    <Skeleton className="h-10 w-70" />
                    <Skeleton className="h-7 w-70 mt-4" />
                </>
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
                                            <SlotCard
                                                key={slot.id}
                                                price={slot.price}
                                                time={format(
                                                    slot.date_time,
                                                    'hh:mm a',
                                                )}
                                                language={
                                                    movie.languages.filter(
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
                {isMovieSlotsLoading && (
                    <>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index}>
                                <div className="h-px bg-border"></div>
                                <div className="flex flex-col  gap-6 py-4">
                                    <Skeleton className="w-100 h-8" />
                                    <div className="flex flex-wrap gap-6">
                                        {Array.from({ length: 6 }).map(
                                            (_, index) => (
                                                <Skeleton
                                                    key={index}
                                                    className="w-40 h-18"
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
                    <TypographyH4 className="text-center">
                        No Slots Available for the selected Date. Please Change
                        the Date.
                    </TypographyH4>
                )}
            </div>
        </div>
    );
};
