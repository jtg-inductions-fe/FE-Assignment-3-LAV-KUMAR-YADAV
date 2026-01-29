import { Link } from 'react-router';

import { cn } from '@/lib';

import type { StatusFallbackProps } from './StatusFallback.types';
import { TypographyH1, TypographyP } from '../Typography';
import { Button } from '../ui/button';

/**
 * StatusFallback component
 *
 * A reusable, centered status display used to communicate application states
 * such as empty results, errors, or unavailable content.
 *
 * Features:
 * - Optional illustration image
 * - Heading and descriptive content
 * - Optional call-to-action button with navigation support
 **/
export const StatusFallback = ({
    heading,
    content,
    illustration,
    to,
    className,
    ...props
}: StatusFallbackProps) => (
    <div className={cn('flex justify-center', className)} {...props}>
        <div className="flex max-w-120 flex-col items-center">
            {illustration && (
                <div className="w-80">
                    <img
                        src={illustration}
                        alt=""
                        role="presentation"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            {heading && (
                <TypographyH1 className="mt-5 text-center">
                    {heading}
                </TypographyH1>
            )}
            <TypographyP className="my-5 text-center">{content}</TypographyP>
            {to && (
                <Button asChild>
                    <Link to={to.link}>{to.title}</Link>
                </Button>
            )}
        </div>
    </div>
);
