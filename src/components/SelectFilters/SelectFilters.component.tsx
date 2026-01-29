import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { capitalizeFirstCharacter, cn } from '@/lib';

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
            const modified = [
                ...selected.slice(0, optionIndex),
                ...selected.slice(optionIndex + 1),
            ];
            setSelected(modified);
            onValueChange?.(modified);
        } else {
            const modified = [...selected, option];
            setSelected(modified);
            onValueChange?.(modified);
        }
    };

    return (
        <div className={cn('w-full', className)} {...props}>
            <Collapsible onOpenChange={setOpen} open={open}>
                <div className="flex justify-between">
                    <CollapsibleTrigger className="flex cursor-pointer items-center justify-center gap-2">
                        {open ? <ChevronUp /> : <ChevronDown />}
                        <TypographyH4>{heading}</TypographyH4>
                    </CollapsibleTrigger>
                    <Button onClick={handleClear} variant="link">
                        Clear
                    </Button>
                </div>
                <CollapsibleContent>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => handleOptionsClick(option)}
                            >
                                <Badge
                                    className="cursor-pointer rounded-lg p-2"
                                    variant={
                                        selected.includes(option)
                                            ? 'default'
                                            : 'outline'
                                    }
                                >
                                    {capitalizeFirstCharacter(option)}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};
