import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../store/slices/authSlice';

const API_BASE_URL = 'http://localhost:3001';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
} = api;