import { cn } from '@/lib';

import type { SeatProps } from './Seat.types';

/**
 *  An Seat component representing the seat with disabled, available and selected state
 */
export const Seat = ({
    seatNumber,
    disabled,
    selected,
    ...props
}: SeatProps) => (
    <button
        className={cn(
            'flex min-h-4 min-w-6 cursor-pointer items-center justify-center rounded-sm border text-xs text-green-600 select-none',
            {
                'text-accent cursor-not-allowed': disabled,
                'text-primary-foreground bg-green-600': selected,
                'hover:bg-green-50': !selected && !disabled,
            },
        )}
        {...props}
        disabled={disabled}
    >
        {seatNumber.toString().padStart(2, '0')}
    </button>
);
