import { cn } from '@/lib';

import type { CardProps } from './Card.types';
import { TypographyH3, TypographyMuted } from '../Typography';
import { Card as ShadCNCard, CardContent } from '../ui/card';

/**
 * Returns a card with Image, Heading and Subheading
 */
export const Card = ({
    heading,
    imageUrl,
    subheading,
    className,
    ...props
}: CardProps) => (
    <ShadCNCard
        {...props}
        className={cn('hover:bg-muted max-w-100 select-none', className)}
    >
        <CardContent>
            <div>
                <img
                    src={imageUrl}
                    alt={`${heading} Poster`}
                    className={cn('rounded-xl')}
                />
            </div>
            <TypographyH3 className="truncate" title={heading}>
                {heading}
            </TypographyH3>
            <TypographyMuted title={subheading} className="truncate">
                {subheading}
            </TypographyMuted>
        </CardContent>
    </ShadCNCard>
);
