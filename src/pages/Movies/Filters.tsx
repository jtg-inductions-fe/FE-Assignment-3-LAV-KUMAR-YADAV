import { useState } from 'react';

import { format } from 'date-fns';
import { useSearchParams } from 'react-router';

import { DatePicker, SelectFilters } from '@/components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useCinemasQuery, useGenresQuery, useLanguagesQuery } from '@/services';
import { DialogClose } from '@radix-ui/react-dialog';

/**
 * Filters Component
 *
 * Provides a user interface for filtering movies based on:
 * - Languages (multi-select)
 * - Genres (multi-select)
 * - Cinema (single select)
 * - Date (date picker)
 *
 * The selected filter values are stored in the URL search parameters
 * so they can be accessed by other components such as the Movies list.
 *
 * This component does not directly fetch movies; instead, it updates
 * the query parameters used by the parent component to trigger filtering.
 */
export const Filters = ({ inModal = false }: { inModal?: boolean }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filtersToApply, setFiltersToApply] = useState<{
        languages?: string[];
        genres?: string[];
        slot_date?: string;
        cinema?: string;
    }>({
        languages: searchParams.get('languages')?.split(','),
        genres: searchParams.get('genres')?.split(','),
        slot_date: searchParams.get('slot_date') ?? undefined,
        cinema: searchParams.get('cinema') ?? undefined,
    });

    const { data: totalLanguages } = useLanguagesQuery();
    const { data: totalGenres } = useGenresQuery();
    const { data: totalCinemas } = useCinemasQuery();

    const applyBtnDisabled =
        filtersToApply.cinema == searchParams.get('cinema') &&
        filtersToApply.slot_date == searchParams.get('slot_date') &&
        filtersToApply.genres?.sort().join(',') == searchParams.get('genres') &&
        filtersToApply.languages?.sort().join(',') ==
            searchParams.get('languages');

    const handleApplyFilter = () => {
        searchParams.delete('languages');
        searchParams.delete('genres');
        searchParams.delete('slot_date');
        searchParams.delete('cinema');

        if (filtersToApply.cinema) {
            searchParams.append('cinema', filtersToApply.cinema);
        }

        if (filtersToApply.slot_date) {
            searchParams.append('slot_date', filtersToApply.slot_date);
        }

        if (filtersToApply.languages?.length) {
            searchParams.append(
                'languages',
                filtersToApply.languages.sort().join(','),
            );
        }

        if (filtersToApply.genres?.length) {
            searchParams.append(
                'genres',
                filtersToApply.genres.sort().join(','),
            );
        }
        setSearchParams(searchParams);
    };

    return (
        <div className=" flex-col gap-6 bg-accent p-10 rounded-xl  h-full flex ">
            <SelectFilters
                heading="Languages"
                options={
                    totalLanguages?.map((language) => language.language) || []
                }
                onChange={(languages) => {
                    setFiltersToApply((prev) => ({
                        ...prev,
                        languages,
                    }));
                }}
                alreadySelected={searchParams.get('languages')?.split(',')}
            />
            <SelectFilters
                heading="Genres"
                options={totalGenres?.map((gen) => gen.genre) || []}
                onChange={(genres) => {
                    setFiltersToApply((prev) => ({
                        ...prev,
                        genres,
                    }));
                }}
                alreadySelected={searchParams.get('genres')?.split(',')}
            />

            <div>
                <Label className="mb-3">Cinema</Label>
                <Select
                    onValueChange={(cinema_id) => {
                        if (cinema_id !== '-1') {
                            setFiltersToApply((prev) => ({
                                ...prev,
                                cinema: cinema_id,
                            }));
                        } else {
                            setFiltersToApply((prev) => ({
                                ...prev,
                                cinema: undefined,
                            }));
                        }
                    }}
                    defaultValue={searchParams.get('cinema') || undefined}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Cinema" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cinemas</SelectLabel>
                            <SelectItem value="-1">All</SelectItem>
                            {totalCinemas?.map((cinema, index) => (
                                <SelectItem
                                    key={index}
                                    value={cinema.id.toString()}
                                >
                                    {cinema.name} at {cinema.location.location}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DatePicker
                label="Date"
                onChange={(date) => {
                    if (date) {
                        setFiltersToApply((prev) => ({
                            ...prev,
                            slot_date: format(date, 'yyyy-MM-dd'),
                        }));
                    } else {
                        setFiltersToApply((prev) => ({
                            ...prev,
                            slot_date: undefined,
                        }));
                    }
                }}
            />
            {inModal ? (
                <DialogClose disabled={applyBtnDisabled} asChild>
                    <Button
                        onClick={handleApplyFilter}
                        disabled={applyBtnDisabled}
                    >
                        Apply Filters
                    </Button>
                </DialogClose>
            ) : (
                <Button onClick={handleApplyFilter} disabled={applyBtnDisabled}>
                    Apply Filters
                </Button>
            )}
        </div>
    );
};
