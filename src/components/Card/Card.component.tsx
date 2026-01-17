import { cn } from '@/lib';

import type { CardProps } from './Card.types';
import { TypographyH3, TypographyMuted } from '../Typography';
import { Card as ShadCNCard, CardContent } from '../ui/card';

export const Card = ({
    heading,
    imageUrl,
    subheading,
    className,
    ...props
}: CardProps) => (
    <ShadCNCard {...props} className={cn('max-w-100 select-none', className)}>
        <CardContent>
            <div>
                <img
                    src={imageUrl}
                    alt={`${heading} Poster`}
                    className={cn('rounded-xl')}
                />
            </div>
            <TypographyH3>{heading}</TypographyH3>
            <TypographyMuted>{subheading}</TypographyMuted>
        </CardContent>
    </ShadCNCard>
);
