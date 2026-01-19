import type { ComponentProps } from 'react';

export type SeatProps = ComponentProps<'button'> & {
    /**
     * To show the seat Number inside the seat component
     */
    seatNumber: number | string;

    /**
     * Changing and showing the seat state as selected
     */
    selected?: boolean;

    /**
     * Showing that seat is already booked, can not be selected
     */
    disabled?: boolean;
};
