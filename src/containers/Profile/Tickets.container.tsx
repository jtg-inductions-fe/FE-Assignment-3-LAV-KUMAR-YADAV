import { useState } from 'react';

import { format } from 'date-fns';
import { EllipsisVertical, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

import { Ticket, TypographyP } from '@/components';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DATE_FORMAT_CUSTOM, TIME_FORMAT } from '@/constants';
import { numberToAlphabet } from '@/lib';
import { useCancelTicketMutation, useTicketsInfiniteQuery } from '@/services';
import type { Ticket as TicketType } from '@/services/services.types';
import { useAppSelector } from '@/store';
import { DialogClose } from '@radix-ui/react-dialog';

/**
 * Tickets container
 *
 * Displays all active and cancelled tickets for the authenticated user.
 *
 * @example
 * ```tsx
 * <Tickets />
 * ```
 */

export const Tickets = () => {
    const token = useAppSelector((state) => state.authReducer.token);
    const { data, fetchNextPage, hasNextPage } = useTicketsInfiniteQuery(
        undefined,
        { skip: !token },
    );
    const [cancelTicket, { isLoading: isCancelling }] =
        useCancelTicketMutation();

    const [ticketToBeCancel, setTicketToBeCancel] = useState<TicketType | null>(
        null,
    );

    const handleCancelTicket = async () => {
        if (!ticketToBeCancel || !token || isCancelling) return;
        try {
            await cancelTicket(ticketToBeCancel.id).unwrap();
            toast.success('Ticket Cancelled Successfully', {
                style: {
                    color: 'green',
                },
            });
        } catch {
            toast.error('Failed To Cancel the ticket', {
                style: {
                    color: 'red',
                },
            });
        } finally {
            setTicketToBeCancel(null);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-5">
                {data?.pages
                    .flatMap((page) => page.results)
                    .map((ticket) => (
                        <div key={ticket.id} className="relative">
                            {ticket.status != 'CANCELLED' && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer absolute right-3 top-3">
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="border rounded-xl w-56 "
                                        align="start"
                                    >
                                        <DropdownMenuItem
                                            onClick={() =>
                                                setTicketToBeCancel(ticket)
                                            }
                                        >
                                            <X />
                                            Cancel Your Ticket
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
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
                                showTime={format(ticket.show_time, TIME_FORMAT)}
                                status={ticket.status}
                                ticketId={ticket.id}
                                aria-label={`Ticket for ${ticket.movie}`}
                            />
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

            {ticketToBeCancel && (
                <Dialog
                    open={!!ticketToBeCancel}
                    onOpenChange={(val) => {
                        if (!val) setTicketToBeCancel(null);
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-destructive">
                                Confirm Ticket Cancellation
                            </DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. Once cancelled,
                                this ticket cannot be recovered.
                            </DialogDescription>
                        </DialogHeader>
                        <TypographyP className="text-destructive">
                            Ticket being cancelled
                        </TypographyP>
                        <Ticket
                            cinemaLocation={ticketToBeCancel.cinema_location}
                            cinemaName={ticketToBeCancel.cinema_name}
                            date={format(
                                ticketToBeCancel.show_time,
                                DATE_FORMAT_CUSTOM,
                            )}
                            movieLanguage={ticketToBeCancel.language}
                            movieName={ticketToBeCancel.movie}
                            seatNumber={
                                numberToAlphabet(ticketToBeCancel.row_number) +
                                ticketToBeCancel.seat_number
                            }
                            showTime={format(
                                ticketToBeCancel.show_time,
                                TIME_FORMAT,
                            )}
                            status={ticketToBeCancel.status}
                            ticketId={ticketToBeCancel.id}
                            className="w-auto"
                            aria-label={`Ticket for ${ticketToBeCancel.movie} to be cancelled`}
                        />

                        <TypographyP>
                            Are you sure you want to cancel this ticket?
                        </TypographyP>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full">
                                Keep Ticket
                            </Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => void handleCancelTicket()}
                            disabled={isCancelling}
                        >
                            {isCancelling ? (
                                <>
                                    <Loader2 className="animate-spin" />{' '}
                                    Cancelling...
                                </>
                            ) : (
                                'Yes, cancel ticket'
                            )}
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};
