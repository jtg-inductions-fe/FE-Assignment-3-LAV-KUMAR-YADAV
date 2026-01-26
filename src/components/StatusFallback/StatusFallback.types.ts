import type { ComponentProps } from 'react';

export type StatusFallbackProps = ComponentProps<'div'> & {
    /**fallback image */
    illustration?: string;

    /**fallback title */
    heading?: string;

    /**fallback body text */
    content: string;

    /**Link for where to redirect */
    to?: {
        /**Link to redirect */
        link: string;

        /**Title to show */
        title: string;
    };
};
