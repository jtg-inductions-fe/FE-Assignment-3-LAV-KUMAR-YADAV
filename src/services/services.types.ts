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
    id: number;
    language: string;
};

export type Genre = {
    id: number;
    genre: string;
};

export type Movie = {
    id: number;
    name: string;
    languages: Language[];
    genres: Genre[];
    description: string;
    duration: string;
    slug: string;
    release_date: string;
    movie_poster: string | null;
};

export type PaginatedQueryResponse<DataType> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: DataType[];
};
