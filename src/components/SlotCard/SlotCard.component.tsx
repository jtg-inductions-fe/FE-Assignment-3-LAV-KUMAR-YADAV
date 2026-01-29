import { Clock } from 'lucide-react';

import { capitalizeFirstCharacter, cn } from '@/lib';

import type { SlotCardProps } from './SlotCard.types';
import { TypographyP } from '../Typography';
/**
 * A Card to Show the Slot Time, Slot Price and the language in which the slot is
 */
export const SlotCard = ({
    time,
    price,
    language,
    className,
    ...props
}: SlotCardProps) => (
    <div
        className={cn(
            'h-18 w-40 cursor-pointer overflow-hidden rounded-xl border p-3 text-center text-green-600 select-none hover:bg-green-50',
            className,
        )}
        {...props}
    >
        <TypographyP>
            <Clock className="mr-2 inline" />
            {time}
        </TypographyP>
        <TypographyP>
            {language ? capitalizeFirstCharacter(language) + ', ' : ''}
            &#8377;
            {price}
        </TypographyP>
    </div>
);
