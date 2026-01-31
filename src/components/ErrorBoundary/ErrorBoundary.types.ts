import type { ReactNode } from 'react';

export type ErrorBoundaryProps = {
    /** Component to show in place of content when an error occurs */
    fallback: ReactNode;

    /** The component which may throw an error */
    children: ReactNode;
};

export type ErrorBoundaryState = {
    /** Whether an error has been caught in the children */
    hasError: boolean;
};
