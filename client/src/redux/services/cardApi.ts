/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.REACT_APP_API_URL as string

const user = JSON.parse(localStorage.getItem('user') || '{}')

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({
    baseUrl,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    prepareHeaders: (headers, { getState }) => {
      if (user.token) {
        headers.set('Authorization', `Bearer ${user.token}`)
      }

      headers.set('Accept', 'application/json, application/xml, text/plain, text/html, *.*')

      return headers
    },
  }),

  tagTypes: ['Cards'],

  endpoints: (builder) => ({
    getCards: builder.query<any, { page: number; limit: number }>({
      query: ({ page, limit }) => ({
        url: 'api/card',
        params: { page, limit },
      }),

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },

      merge: (currentCache, newItems) => {
        currentCache.push(...newItems)
      },

      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg)
      },

      providesTags: ['Cards'],
    }),

    addCard: builder.mutation({
      query: ({ title, description, userId }) => ({
        url: 'api/card',
        method: 'POST',
        body: { title, description, userId },
      }),
      invalidatesTags: ['Cards'],
    }),
  }),
})

export const { useGetCardsQuery, useAddCardMutation } = cardApi
