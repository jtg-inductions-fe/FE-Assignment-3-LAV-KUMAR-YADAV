import { format } from 'date-fns';
import { MapPin } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';

import { DatePicker, TypographyH1, TypographyP } from '@/components';
import { Skeleton } from '@/components/ui/skeleton';
import { useCinemaQuery } from '@/services';

import { CinemaSlots } from './CinemaSlots.container';

/**
 * Cinema container
 *
 * Displays details for a single cinema and its available movie slots.
 *
 * @example
 * ```tsx
 * <Cinema />
 * ```
 */

export const Cinema = () => {
    const { id } = useParams();
    const { data: cinema, isLoading: isCinemaLoading } = useCinemaQuery(
        { id: id! },
        { skip: !id },
    );
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="my-6 flex flex-col gap-4">
            {!isCinemaLoading && cinema && (
                <>
                    <TypographyH1>{cinema?.name}</TypographyH1>
                    <TypographyP>
                        <MapPin className="mr-2 inline" />
                        {cinema?.location.location}
                    </TypographyP>
                </>
            )}
            {isCinemaLoading && (
                <>
                    <Skeleton className="h-10 w-70" />
                    <Skeleton className="mt-4 h-7 w-70" />
                </>
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
            <CinemaSlots />
        </div>
    );
};
