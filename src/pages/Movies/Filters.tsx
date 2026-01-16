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
export const Filters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { data: totalLanguages } = useLanguagesQuery();
    const { data: totalGenres } = useGenresQuery();
    const { data: totalCinemas } = useCinemasQuery();

    return (
        <div className=" flex-col gap-6 bg-accent p-10 rounded-xl  h-full flex ">
            <SelectFilters
                heading="Languages"
                options={
                    totalLanguages?.map((language) => language.language) || []
                }
                onChange={(languages) => {
                    searchParams.delete('languages');
                    if (languages.join(',') !== '') {
                        searchParams.append('languages', languages.join(','));
                    }
                }}
                alreadySelected={searchParams.get('languages')?.split(',')}
            />
            <SelectFilters
                heading="Genres"
                options={totalGenres?.map((gen) => gen.genre) || []}
                onChange={(genres) => {
                    searchParams.delete('genres');
                    if (genres.join(',') !== '') {
                        searchParams.append('genres', genres.join(','));
                    }
                }}
                alreadySelected={searchParams.get('genres')?.split(',')}
            />

            <div>
                <Label>Cinema</Label>
                <Select
                    onValueChange={(cinema_id) => {
                        searchParams.delete('cinema');
                        if (cinema_id !== '-1') {
                            searchParams.append('cinema', cinema_id);
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
                    searchParams.delete('slot_date');
                    if (date) {
                        searchParams.append(
                            'slot_date',
                            date.toISOString().slice(0, 10),
                        );
                    }
                }}
            />

            <Button onClick={() => setSearchParams(searchParams)}>
                Apply Filters
            </Button>
        </div>
    );
};
