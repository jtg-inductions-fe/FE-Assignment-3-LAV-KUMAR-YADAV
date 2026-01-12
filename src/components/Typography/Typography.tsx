import type { ReactNode } from 'react';

export const TypographyH1 = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <h1
        className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className}`}
        {...args}
    >
        {children}
    </h1>
);

export const TypographyH2 = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <h2
        className={`scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
        {...args}
    >
        {children}
    </h2>
);

export const TypographyH3 = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <h3
        className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
        {...args}
    >
        {children}
    </h3>
);

export const TypographyH4 = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <h4
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
        {...args}
    >
        {children}
    </h4>
);

export const TypographyP = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <p
        className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}
        {...args}
    >
        {children}
    </p>
);

export const TypographyLead = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <p className={`text-muted-foreground text-xl ${className}`} {...args}>
        {children}
    </p>
);

export const TypographyLarge = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <div className={`text-lg font-semibold ${className}`} {...args}>
        {children}
    </div>
);

export const TypographySmall = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <small
        className={`text-sm leading-none font-medium ${className}`}
        {...args}
    >
        {children}
    </small>
);

export const TypographyMuted = ({
    children,
    className,
    ...args
}: {
    children: ReactNode;
    className: string;
}) => (
    <p className={`text-muted-foreground text-sm ${className}`} {...args}>
        {children}
    </p>
);
