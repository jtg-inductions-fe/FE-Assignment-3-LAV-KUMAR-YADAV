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
        <div className="max-w-120 flex flex-col items-center">
            {illustration && (
                <div className="w-80 sm:w-150 md:w-180">
                    <img
                        src={illustration}
                        alt={
                            heading
                                ? `illustration for ${heading}`
                                : 'Status illustration'
                        }
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            {heading && (
                <TypographyH1 className="text-center mt-5">
                    {heading}
                </TypographyH1>
            )}
            {content && (
                <TypographyP className="text-center my-5">
                    {content}
                </TypographyP>
            )}
            {to && (
                <Button asChild>
                    <Link to={to.link}>{to.title}</Link>
                </Button>
            )}
        </div>
    </div>
);
