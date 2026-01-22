import { format, formatDate } from 'date-fns';
import { MapPin } from 'lucide-react';
import { useParams } from 'react-router';

import { TypographyH2, TypographyP } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { DATE_FORMAT_CUSTOM, TIME_FORMAT } from '@/constants';
import { capitalizeFirstCharacter } from '@/lib';
import { useSlotDetailsQuery } from '@/services';

import { SeatGrid } from './SeatGrid.container';
/**
 * - Container which shows the Slot Details and Seat Grid
 * - With Book Tickets option
 */
export const Booking = () => {
    const { slotId } = useParams();

    const { data: slotDetails, isLoading: isSlotDetailsLoading } =
        useSlotDetailsQuery({
            id: slotId,
        });

    const movieLanguage = slotDetails?.movie.languages.find(
        (language) => language.id === slotDetails.slot.language,
    );

    return (
        <div className="my-4 px-4 pb-24">
            {!isSlotDetailsLoading && slotDetails && (
                <>
                    <TypographyH2 className="mb-2">
                        {slotDetails?.movie.name} - (
                        {movieLanguage?.language &&
                            capitalizeFirstCharacter(movieLanguage.language)}
                        )
                    </TypographyH2>

                    <TypographyP className="mb-4 text-gray-600">
                        <MapPin className="inline mr-1" />
                        {slotDetails?.cinema.location.location &&
                            capitalizeFirstCharacter(
                                slotDetails.cinema.location.location,
                            ) +
                                ' ' +
                                slotDetails.cinema.name}
                        &nbsp; | &nbsp;
                        {slotDetails?.slot.date_time &&
                            formatDate(
                                slotDetails.slot.date_time,
                                DATE_FORMAT_CUSTOM,
                            )}
                        &nbsp; | &nbsp;
                        {slotDetails?.slot.date_time &&
                            format(slotDetails.slot.date_time, TIME_FORMAT)}
                    </TypographyP>
                </>
            )}
            {isSlotDetailsLoading && (
                <>
                    <Skeleton className="h-9 mb-2 w-100" />
                    <Skeleton className="h-7 mb-4 w-150" />
                </>
            )}
            <SeatGrid />
        </div>
    );
};
