import { Clock } from 'lucide-react';

import { capitalizeFirstCharacter } from '@/lib';

import type { SlotCardProps } from './SlotCard.types';
import { TypographyP } from '../Typography';
/**
 * A Card to Show the Slot Time, Slot Price and the language in which the slot is
 */
export const SlotCard = ({ time, price, language }: SlotCardProps) => (
    <div className="border  rounded-xl p-3 w-40 h-18 text-center text-green-600 overflow-hidden select-none">
        <TypographyP>
            <Clock className="inline mr-2" />
            {time}
        </TypographyP>
        <TypographyP>
            {language ? capitalizeFirstCharacter(language) + ', ' : ''}
            &#8377;
            {price}
        </TypographyP>
    </div>
);
