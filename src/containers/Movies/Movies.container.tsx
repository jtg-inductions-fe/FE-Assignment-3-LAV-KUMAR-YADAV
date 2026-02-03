import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Filters } from './Filters.container';
import { MoviesCards } from './MovieCards.container';

/**
 * Movies container
 *
 * Displays a list of movies with filter controls.
 *
 * @example
 * ```tsx
 * <Movies />
 * ```
 */

export const Movies = () => (
    <div className="my-5 flex h-180 flex-col gap-6 overflow-y-auto md:flex-row [&::-webkit-scrollbar]:hidden">
        <div className="hidden min-w-80 md:block"></div>
        <aside
            className="absolute hidden h-180 min-h-[70vh] w-80 md:block"
            aria-label="Movie filters"
        >
            <Filters />
        </aside>

        <div className="md:hidden md:min-h-[70vh]">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        className="fixed bottom-30 left-20"
                        aria-label="Open movie filters"
                    >
                        <Filter aria-hidden />
                    </Button>
                </DialogTrigger>
                <DialogContent
                    className="bg-accent h-[60%] overflow-y-auto md:hidden"
                    aria-describedby="filter-dialog-description"
                >
                    <DialogHeader>
                        <DialogTitle>Filters</DialogTitle>
                        <DialogDescription id="filter-dialog-description">
                            Apply filters to customize the results
                        </DialogDescription>
                    </DialogHeader>

                    <Filters inModal />
                </DialogContent>
            </Dialog>
        </div>
        <MoviesCards />
    </div>
);
