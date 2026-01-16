/**
 * Props for the SelectFilters component.
 *
 * Defines the configuration and behavior of a multi-select filter group.
 */
export type SelectFilterProps = {
    /**
     * Title displayed at the top of the filter section.
     */
    heading: string;

    /**
     * List of selectable option values to be displayed as badges.
     */
    options: string[];

    /**
     * Optional list of values that should be pre-selected when the component mounts.
     */
    alreadySelected?: string[];

    /**
     * Callback function triggered whenever the selection changes.
     *
     * @param props - Updated array of selected option values
     */
    onChange?: (props: string[]) => void;

    /**
     * Optional additional CSS class names to apply to the root container.
     */
    className?: string;
};
