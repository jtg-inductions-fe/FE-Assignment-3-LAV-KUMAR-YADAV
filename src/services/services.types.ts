export type SignupRequest = {
    name: string;
    phone_number?: string | undefined;
    email: string;
    profile_pic?: File | undefined;
    password: string;
};

export type SignupResponse = {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    profile_pic: string;
    access: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    access: string;
};
