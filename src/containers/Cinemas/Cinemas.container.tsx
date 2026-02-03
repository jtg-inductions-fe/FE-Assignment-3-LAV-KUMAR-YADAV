import { format } from 'date-fns';
import { Link, useSearchParams } from 'react-router';

import CinemasNotAvailable from '@/assets/illustrations/cinemas-not-available.svg';
import {
    StatusFallback,
    TypographyH2,
    TypographyH4,
    TypographyMuted,
} from '@/components';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DATE_FORMAT_ISO } from '@/constants';
import { capitalizeFirstCharacter } from '@/lib';
import { useCinemasQuery } from '@/services';

import { LocationFilter } from './LocationFilter.container';

/**
 * Cinemas container
 *
 * Displays a list of cinemas filtered by the selected location.
 *
 * @example
 * ```tsx
 * <Cinemas />
 * ```
 */

export const Cinemas = () => {
    const [searchParams] = useSearchParams();

    const { data: cinemas, isLoading: isCinemasLoading } = useCinemasQuery({
        location: searchParams.get('location') ?? undefined,
    });

    const today = format(new Date(), DATE_FORMAT_ISO);

    return (
        <section className="my-6" aria-labelledby="cinemas-heading">
            <TypographyH2 id="cinemas-heading" className="mb-5">
                Cinemas
            </TypographyH2>
            <LocationFilter />
            <ul
                className="mt-2 flex flex-wrap justify-center gap-8"
                aria-busy={isCinemasLoading}
            >
                {!isCinemasLoading &&
                    !!cinemas?.length &&
                    cinemas.map((cinema) => (
                        <li key={cinema.id}>
                            <Link
                                to={`/cinema/${cinema.id}?date=${today}`}
                                aria-label={`View showtimes for ${cinema.name} in ${cinema.location.location}`}
                            >
                                <Card className="hover:bg-accent flex w-70 flex-col gap-5 px-6">
                                    <TypographyH4>{cinema.name}</TypographyH4>
                                    <TypographyMuted>
                                        {capitalizeFirstCharacter(
                                            cinema.location.location,
                                        )}
                                    </TypographyMuted>
                                </Card>
                            </Link>
                        </li>
                    ))}

                {isCinemasLoading &&
                    Array.from({ length: 6 }).map((_, index) => (
                        <li key={index} aria-hidden="true">
                            <Skeleton className="h-40 w-70 rounded-xl" />
                        </li>
                    ))}
            </ul>
            {!isCinemasLoading && !cinemas?.length && (
                <StatusFallback
                    heading="No Results"
                    content="There are no cinemas available"
                    illustration={CinemasNotAvailable}
                />
            )}
        </section>
    );
};
