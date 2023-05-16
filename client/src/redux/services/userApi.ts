/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.REACT_APP_API_URL

const user = JSON.parse(localStorage.getItem('user') || '{}')

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  tagTypes: ['User'],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({ name, password }) => ({
        url: 'api/user/signup',
        method: 'POST',
        body: { name, password },
      }),
      invalidatesTags: ['User'],
    }),

    signin: builder.mutation({
      query: ({ name, password }) => ({
        url: 'api/user/signin',
        method: 'POST',
        body: { name, password },
      }),
      invalidatesTags: ['User'],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    check: builder.query<any, void>({
      query: () => ({
        url: 'api/user/auth',
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { useSignupMutation, useSigninMutation, useCheckQuery } = userApi
