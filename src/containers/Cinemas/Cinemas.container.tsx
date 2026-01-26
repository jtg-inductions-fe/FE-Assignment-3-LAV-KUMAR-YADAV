import { format } from 'date-fns';
import { Link, useSearchParams } from 'react-router';

import CinemasNotAvailable from '@/assets/images/cinemas-not-available.svg';
import { TypographyH2, TypographyH4, TypographyMuted } from '@/components';
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
                className="flex flex-wrap justify-center gap-8 mt-2"
                aria-busy={isCinemasLoading}
            >
                {!isCinemasLoading &&
                    !!cinemas?.length &&
                    cinemas?.map((cinema) => (
                        <li key={cinema.id}>
                            <Link
                                to={`/cinema/${cinema.id}?date=${today}`}
                                aria-label={`View showtimes for ${cinema.name} in ${cinema.location.location}`}
                            >
                                <Card className="flex flex-col hover:bg-accent w-70 px-6 gap-5">
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
                        <li key={index} aria-hidden>
                            <Skeleton className="h-40 w-70 rounded-xl" />
                        </li>
                    ))}

                {!isCinemasLoading && !cinemas?.length && (
                    <div
                        className="flex flex-col justify-center items-center"
                        role="status"
                        aria-live="polite"
                    >
                        <div>
                            <img src={CinemasNotAvailable} alt="" aria-hidden />
                        </div>
                        <TypographyH2 className="text-center">
                            There are no Cinemas Available
                        </TypographyH2>
                    </div>
                )}
            </ul>
        </section>
    );
};
