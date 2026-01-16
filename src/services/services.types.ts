export type SignupRequest = {
    /**
     * Full name of the user.
     */
    name: string;

    /**
     * Optional phone number of the user.
     */
    phone_number?: string | undefined;

    /**
     * Email address of the user.
     */
    email: string;

    /**
     * Optional profile picture file uploaded by the user.
     */
    profile_pic?: File | undefined;

    /**
     * Password chosen by the user.
     */
    password: string;
};

export type SignupResponse = {
    /**
     * Unique identifier of the user.
     */
    id: number;

    /**
     * Full name of the user.
     */
    name: string;

    /**
     * Phone number of the user.
     */
    phone_number: string;

    /**
     * Email address of the user.
     */
    email: string;

    /**
     * URL of the user's profile picture.
     */
    profile_pic: string;

    /**
     * Access token issued after registration.
     */
    access: string;
};

export type LoginRequest = {
    /**
     * Email address of the user.
     */
    email: string;

    /**
     * Password of the user.
     */
    password: string;
};

export type LoginResponse = {
    /**
     * Access token issued after authentication.
     */
    access: string;
};

export type Language = {
    /**
     * unique identifier of language
     */
    id: number;
    /**
     * name of the language
     */
    language: string;
};

export type Genre = {
    /**
     * unique identifier of genre
     */
    id: number;
    /**
     * name of the genre
     */
    genre: string;
};

export type Movie = {
    /**
     * unique identifier of the movie
     */
    id: number;

    /**
     * name of the movie
     */
    name: string;

    /**
     * language in which movies is available
     */
    languages: Language[];

    /**
     * list of genres of the movie
     */
    genres: Genre[];

    /**
     * About the movie
     */
    description: string;

    /**
     * time duration of the movie
     */
    duration: string;

    /**
     * slug for uniq url of the movie
     */
    slug: string;

    /**
     * date on which movies released
     */
    release_date: string;

    /**
     * Poster of the movie
     */
    movie_poster: string | null;
};

/**
 * This is the response type of paginated data
 */
export type PaginatedQueryResponse<DataType> = {
    /**
     * total number of records in db
     */
    count: number;

    /**
     * url to next page including the query params
     */
    next: string | null;
    /**
     * url to previous page including query params
     */
    previous: string | null;

    /**
     * list of data
     */
    results: DataType[];
};

export type Location = {
    /**
     * unique identifier for the location
     */
    id: number;

    /**
     * name of the location
     */
    location: string;
};

export type Cinema = {
    /**
     * unique identifier of the cinema
     */
    id: number;

    /**
     * name of the cinema
     */
    name: string;

    /**
     *location of the cinema
     */
    location: Location;

    /**
     * total no of rows in the cinema
     */
    rows: number;

    /**
     * total number of seats per row in the cinema
     */
    seats_per_row: number;
};
