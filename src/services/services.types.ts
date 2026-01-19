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
