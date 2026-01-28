import { useState } from 'react';

import { BadgeCheck, Loader2 } from 'lucide-react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import ScreenImage from '@/assets/images/screen-img.png';
import {
    Seat,
    TypographyH2,
    TypographyH3,
    TypographyMuted,
    TypographyP,
} from '@/components';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { SLOT_DETAILS_POLLING_INTERVAL_TIME } from '@/constants';
import { numberToAlphabet } from '@/lib';
import { useBookingMutation, useSlotDetailsQuery } from '@/services';

import type { SeatType } from './Booking.types';

/**
 * SeatGrid component
 *
 * Renders an interactive cinema seat layout for a given show slot,
 * allowing users to select available seats and complete a booking.
 *
 * @example
 * ```tsx
 * <SeatGrid />
 * ```
 */

export const SeatGrid = () => {
    const { slotId } = useParams();

    const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] =
        useState<boolean>(false);
    const {
        data: slotDetails,
        isLoading: isSlotDetailsLoading,
        error,
    } = useSlotDetailsQuery(
        {
            id: slotId!,
        },
        {
            skip: !slotId,
            pollingInterval: SLOT_DETAILS_POLLING_INTERVAL_TIME,
            skipPollingIfUnfocused: true,
        },
    );

    const [bookTickets, { isLoading: isBooking }] = useBookingMutation();

    const handleToggleSelect = (seat: SeatType) => {
        const isBooked = slotDetails?.booked_seats.some(
            (bookedSeat) =>
                bookedSeat.row_number === seat.row_number &&
                bookedSeat.seat_number === seat.seat_number,
        );

        if (isBooked) return;

        const isSelected = selectedSeats.some(
            (selectedSeat) =>
                selectedSeat.row_number === seat.row_number &&
                selectedSeat.seat_number === seat.seat_number,
        );

        if (!isSelected) {
            setSelectedSeats((prev) => [...prev, seat]);
        } else {
            setSelectedSeats((prev) =>
                prev.filter(
                    (prevSeat) =>
                        !(
                            prevSeat.row_number === seat.row_number &&
                            prevSeat.seat_number === seat.seat_number
                        ),
                ),
            );
        }
    };

    const selectedCount = selectedSeats.length;
    const totalAmount = selectedCount * Number(slotDetails?.slot.price);

    const handleBooking = async () => {
        if (!slotId) {
            toast.error('Invalid slot. Please refresh and try again.');

            return;
        }
        try {
            await bookTickets({
                slot_id: Number(slotId),
                seats: selectedSeats,
            }).unwrap();
            setIsSuccessModalOpen(true);
        } catch {
            toast.error('Ticket booking failed. Please try again');
        } finally {
            setSelectedSeats([]);
        }
    };

    return (
        <>
            {!isSlotDetailsLoading && slotDetails && (
                <div>
                    <div className="flex justify-center">
                        <div className="w-full bg-card max-w-200 overflow-auto max-h-[60vh] rounded-md shadow-inner">
                            <div className="inline-block min-w-max mx-auto p-3">
                                {Array.from({
                                    length: slotDetails.cinema.rows,
                                }).map((_, index) => {
                                    const row = slotDetails.cinema.rows - index;

                                    return (
                                        <div
                                            key={`row-${row}`}
                                            className="flex items-center gap-1"
                                        >
                                            <TypographyP className="min-w-6">
                                                {numberToAlphabet(row)}
                                            </TypographyP>

                                            {Array.from({
                                                length: slotDetails.cinema
                                                    .seats_per_row,
                                            }).map((__, idx) => {
                                                const col =
                                                    slotDetails.cinema
                                                        .seats_per_row - idx;

                                                const isSelected =
                                                    selectedSeats.some(
                                                        (s) =>
                                                            s.row_number ===
                                                                row &&
                                                            s.seat_number ===
                                                                col,
                                                    );

                                                const isDisabled =
                                                    slotDetails.booked_seats.some(
                                                        (b) =>
                                                            b.row_number ===
                                                                row &&
                                                            b.seat_number ===
                                                                col,
                                                    );

                                                return (
                                                    <div
                                                        key={`seat-${row}-${col}`}
                                                        className="flex"
                                                    >
                                                        <Seat
                                                            seatNumber={col}
                                                            onClick={() =>
                                                                handleToggleSelect(
                                                                    {
                                                                        row_number:
                                                                            row,
                                                                        seat_number:
                                                                            col,
                                                                    },
                                                                )
                                                            }
                                                            selected={
                                                                isSelected
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                        />

                                                        {col - 1 ===
                                                            slotDetails.cinema
                                                                .seats_per_row /
                                                                2 && (
                                                            <div className="w-8"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}

                                <div className="flex flex-col  items-center mt-20">
                                    <TypographyMuted>
                                        Screen This way
                                    </TypographyMuted>
                                    <img
                                        src={ScreenImage}
                                        alt="Cinema Screen"
                                        className="w-100 object-contain opacity-90"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 mt-4 justify-center text-sm">
                        <div className="flex items-center gap-2">
                            <Seat seatNumber={1} />
                            <span>Available</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Seat seatNumber={1} selected />
                            <span>Selected</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Seat seatNumber={1} disabled />
                            <span>Booked</span>
                        </div>
                    </div>
                </div>
            )}

            {isSlotDetailsLoading && (
                <Skeleton className="h-[60vh] max-w-200 mx-auto" />
            )}

            {!isSlotDetailsLoading && error && !slotDetails && (
                <TypographyH2>This slot has been expired</TypographyH2>
            )}

            {selectedCount > 0 && (
                <div className="w-full mt-30">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <TypographyMuted>
                                You have selected {selectedCount}{' '}
                                {selectedCount === 1 ? 'seat' : 'seats'}
                            </TypographyMuted>

                            <TypographyH3>
                                Total Amount: &#8377;{totalAmount}
                            </TypographyH3>
                        </div>

                        <Button
                            onClick={() => void handleBooking()}
                            disabled={isBooking}
                        >
                            {isBooking && <Loader2 className="animate-spin" />}
                            Pay &#8377;{totalAmount}
                        </Button>
                    </div>
                </div>
            )}

            <Dialog
                open={isSuccessModalOpen}
                onOpenChange={() => setIsSuccessModalOpen(false)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Congratulations!!
                        </DialogTitle>
                        <BadgeCheck className="size-30 text-green-600 self-center" />
                        <DialogDescription className="text-center">
                            Your Tickets have been booked Successfully.Please
                            Visit Your Profile for the tickets.
                        </DialogDescription>
                        <DialogClose asChild>
                            <Button
                                onClick={() => setIsSuccessModalOpen(false)}
                                className="self-center min-w-40"
                            >
                                OK
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
};
