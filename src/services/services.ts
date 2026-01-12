import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
} from './services.types';

const getFormData = (object: Record<string, string | File | undefined>) =>
    Object.keys(object).reduce((formData, key) => {
        if (object[key]) {
            formData.append(key, object[key]);
        }

        return formData;
    }, new FormData());

export const api = createApi({
    reducerPath: 'bookMyShowApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<SignupResponse, SignupRequest>({
            query: (data) => ({
                url: 'users/register/',
                method: 'POST',
                body: getFormData(data),
                headers: {
                    'content-type': 'multipart/form-data',
                },
            }),
        }),
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (data) => ({
                url: 'users/login/',
                method: 'POST',
                body: data,
                headers: {
                    'content-type': 'application/json',
                },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = api;
