import * as React from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib';

import type { DatePickerProps } from './DatePicker.types';

/**
 * DatePicker Component
 *
 * A reusable date selection component that displays a button trigger.
 * When clicked, it opens a popover containing a calendar for selecting a date.
 *
 * Features:
 * - Supports an optional label
 * - Uses a popover for date selection
 * - Restricts selection to today and future dates
 * - Returns selected date via `onChange` callback
 */
export const DatePicker = ({
    label,
    onDateChange,
    id,
    className,
    ...props
}: DatePickerProps) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const handleDateSelect = (date: Date | undefined) => {
        setDate(date);
        setOpen(false);
        onDateChange?.(date);
    };

    return (
        <div className={cn('flex flex-col gap-3', className)} {...props}>
            {label && (
                <Label htmlFor={inputId} className="px-1">
                    {label}
                </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id={inputId}
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : 'Select date'}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleDateSelect}
                        disabled={{
                            before: new Date(),
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};
