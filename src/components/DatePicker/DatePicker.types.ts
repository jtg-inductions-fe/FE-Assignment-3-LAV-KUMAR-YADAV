import type { ComponentProps } from 'react';

export type DatePickerProps = ComponentProps<'div'> & {
    /**
     * An optional Label to show in datePicker when No date is selected
     */
    label?: string;

    /**
     * An Optional callback to handle Changing of date
     */
    onDateChange?: (date: Date | undefined) => void;
};
