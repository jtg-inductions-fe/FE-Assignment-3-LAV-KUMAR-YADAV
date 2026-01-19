import type { ReactNode } from 'react';

export type TypographyProps = {
    /**
     * children to show in that text format
     */
    children: ReactNode;

    /**
     * to apply extra classes
     */
    className?: string;

    /**
     * id for unique- identification
     */
    id?: string;
};
