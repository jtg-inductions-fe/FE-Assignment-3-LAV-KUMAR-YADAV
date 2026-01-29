import type { ComponentProps } from 'react';

export type TicketProps = {
    /**
     * id of ticket
     */
    ticketId: number;

    /**
     * Date of the show
     */
    date: string;

    /**
     * Time of the Show
     */
    showTime: string;

    /**
     * Status of ticket
     */
    status: 'BOOKED' | 'PENDING' | 'CANCELLED';

    /**
     * Seat Number of the ticket
     */
    seatNumber: string;

    /**
     * Name of the movie
     */
    movieName: string;

    /**
     * Language of the movie
     */
    movieLanguage: string;

    /**
     * Name of the cinema
     */
    cinemaName: string;

    /**
     * Location of the cinema
     */
    cinemaLocation: string;
} & ComponentProps<'div'>;
