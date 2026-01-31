import TicketBg from '@/assets/images/ticket-bg.webp';
import { Card } from '@/components/ui/card';
import { capitalizeFirstCharacter, cn } from '@/lib';

import type { TicketProps } from './Ticket.types';
import { TypographyH3, TypographyP } from '../Typography';

/**
 * This is a component which will Show Ticket Details Including
 *  - ticket id, show date and time, movie Name and language, seat number, status of the ticket,
 *  - name and location of the cinema
 */
export const Ticket = ({
    ticketId,
    date,
    className,
    showTime,
    movieName,
    movieLanguage,
    seatNumber,
    status,
    cinemaName,
    cinemaLocation,
    ...props
}: TicketProps) => (
    <div
        style={{
            backgroundImage: `url(${TicketBg})`,
        }}
        className="rounded-xl bg-cover bg-center"
    >
        <Card
            className={cn(
                `w-85 bg-[rgba(255,255,255,0.6)] px-2 py-10`,
                className,
            )}
            {...props}
        >
            <div className="h-full w-full text-sm text-black">
                <div className="mb-10 flex justify-between">
                    <TypographyP className="text-sm">
                        Ticket Id :
                        <span className="text-xl font-bold">{ticketId}</span>
                    </TypographyP>
                    <div>
                        <TypographyP>{date}</TypographyP>
                        <TypographyP className="font-bold">
                            {showTime}
                        </TypographyP>
                    </div>
                </div>
                <TypographyH3 className="text-center">
                    {movieName} - ( {capitalizeFirstCharacter(movieLanguage)} )
                </TypographyH3>
                <TypographyP className="text-center text-lg">
                    {cinemaName} {capitalizeFirstCharacter(cinemaLocation)}
                </TypographyP>
                <div className="mt-10 flex justify-between">
                    <TypographyP>
                        Seat No:
                        <span className="text-xl font-bold"> {seatNumber}</span>
                    </TypographyP>
                    <TypographyP
                        className={cn('text-xl font-bold', {
                            'text-green-700': status === 'BOOKED',
                            'text-destructive': status === 'CANCELLED',
                            'text-yellow-700': status === 'PENDING',
                        })}
                        aria-label={`Ticket status: ${status}`}
                    >
                        {status}
                    </TypographyP>
                </div>
            </div>
        </Card>
    </div>
);
