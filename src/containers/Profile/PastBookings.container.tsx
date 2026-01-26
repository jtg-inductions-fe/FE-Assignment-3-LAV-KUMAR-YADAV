import { format } from 'date-fns';

import { Ticket, TypographyH1 } from '@/components';
import { Button } from '@/components/ui/button';
import { DATE_FORMAT_CUSTOM, TIME_FORMAT } from '@/constants';
import { numberToAlphabet } from '@/lib';
import { usePastBookingsInfiniteQuery } from '@/services';
import { useAppSelector } from '@/store';

/**
 * PastBookings container
 *
 * Displays a list of the user’s past movie bookings.
 *
 *
 * @example
 * ```tsx
 * <PastBookings />
 * ```
 */

export const PastBookings = () => {
    const token = useAppSelector((state) => state.authReducer.token);
    const { data, fetchNextPage, hasNextPage } = usePastBookingsInfiniteQuery(
        undefined,
        { skip: !token },
    );

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-5">
                {data?.pages
                    .flatMap((page) => page.results)
                    .map((ticket) => (
                        <div
                            key={ticket.id}
                            className="relative"
                            role="group"
                            aria-label="expired ticket"
                        >
                            <TypographyH1 className="absolute  top-20 left-10 rotate-45">
                                EXPIRED
                            </TypographyH1>
                            <div className="opacity-40">
                                <Ticket
                                    cinemaLocation={ticket.cinema_location}
                                    cinemaName={ticket.cinema_name}
                                    date={format(
                                        ticket.show_time,
                                        DATE_FORMAT_CUSTOM,
                                    )}
                                    movieLanguage={ticket.language}
                                    movieName={ticket.movie}
                                    seatNumber={
                                        numberToAlphabet(ticket.row_number) +
                                        ticket.seat_number
                                    }
                                    showTime={format(
                                        ticket.show_time,
                                        TIME_FORMAT,
                                    )}
                                    status={ticket.status}
                                    ticketId={ticket.id}
                                />
                            </div>
                        </div>
                    ))}
            </div>
            {hasNextPage && (
                <div className="mx-auto w-20">
                    <Button
                        variant="link"
                        className="underline"
                        onClick={() => void fetchNextPage()}
                    >
                        See More
                    </Button>
                </div>
            )}
        </div>
    );
};
