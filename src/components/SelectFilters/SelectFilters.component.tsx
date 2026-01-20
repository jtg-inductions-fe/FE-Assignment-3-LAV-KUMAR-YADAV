import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib';

import type { SelectFilterProps } from './SelectFilters.types';
import { TypographyH4 } from '../Typography';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

/**
 * SelectFilters Component
 *
 * A reusable multi-select filter component that displays a list of selectable options
 * inside a collapsible panel. Selected values are shown as active badges and can be
 * toggled on or off.
 *
 * Features:
 * - Expandable / collapsible UI
 * - Multi-select support
 * - Clear all selections
 * - Controlled via onChange callback
 * - Supports pre-selected values
 */
export const SelectFilters = ({
    heading,
    options,
    onValueChange,
    alreadySelected,
    className,
    ...props
}: SelectFilterProps) => {
    const [selected, setSelected] = useState<string[]>(alreadySelected || []);
    const [open, setOpen] = useState<boolean>(
        (alreadySelected?.length ?? 0) > 0,
    );

    const handleClear = () => {
        setSelected([]);
        onValueChange?.([]);
    };

    const handleOptionsClick = (option: string) => {
        const optionIndex = selected.indexOf(option);
        if (optionIndex > -1) {
            setSelected((prev) => {
                const modified = [
                    ...prev.slice(0, optionIndex),
                    ...prev.slice(optionIndex + 1),
                ];
                onValueChange?.(modified);

                return modified;
            });
        } else {
            setSelected((prev) => {
                const modified = [...prev, option];
                onValueChange?.(modified);

                return modified;
            });
        }
    };

    return (
        <div className={cn('w-full', className)} {...props}>
            <Collapsible onOpenChange={setOpen} open={open}>
                <div className="flex justify-between">
                    <CollapsibleTrigger className="cursor-pointer flex justify-center items-center gap-2">
                        {open ? <ChevronUp /> : <ChevronDown />}
                        <TypographyH4>{heading}</TypographyH4>
                    </CollapsibleTrigger>
                    <Button onClick={handleClear} variant="link">
                        Clear
                    </Button>
                </div>
                <CollapsibleContent>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {options.map((option, index) => (
                            <Badge
                                key={index}
                                className="cursor-pointer rounded-lg p-2"
                                variant={
                                    selected.includes(option)
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => handleOptionsClick(option)}
                            >
                                {option[0].toLocaleUpperCase() +
                                    option.slice(1)}
                            </Badge>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};
