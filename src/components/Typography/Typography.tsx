import type { ReactNode } from 'react';

import { cn } from '@/lib';

type TypographyProps = {
    children: ReactNode;
    className?: string;
    id?: string;
};

export const TypographyH1 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h1
        className={cn(
            'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
            className,
        )}
        {...args}
    >
        {children}
    </h1>
);

export const TypographyH2 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h2
        className={cn(
            'scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0',
            className,
        )}
        {...args}
    >
        {children}
    </h2>
);

export const TypographyH3 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h3
        className={cn(
            'scroll-m-20 text-2xl font-semibold tracking-tight',
            className,
        )}
        {...args}
    >
        {children}
    </h3>
);

export const TypographyH4 = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <h4
        className={cn(
            'scroll-m-20 text-xl font-semibold tracking-tight',
            className,
        )}
        {...args}
    >
        {children}
    </h4>
);

export const TypographyP = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('leading-7', className)} {...args}>
        {children}
    </p>
);

export const TypographyLead = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('text-muted-foreground text-xl', className)} {...args}>
        {children}
    </p>
);

export const TypographyLarge = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <div className={cn('text-lg font-semibold', className)} {...args}>
        {children}
    </div>
);

export const TypographySmall = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <small
        className={cn('text-sm leading-none font-medium', className)}
        {...args}
    >
        {children}
    </small>
);

export const TypographyMuted = ({
    children,
    className,
    ...args
}: TypographyProps) => (
    <p className={cn('text-muted-foreground text-sm', className)} {...args}>
        {children}
    </p>
);
