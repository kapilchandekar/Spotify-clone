import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "40e0bfb283msh3e47b050e10ec8ep1a24b3jsn3d7ea3b0c0f0";
const BASE_URL = "https://shazam.p.rapidapi.com";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", API_KEY);
      headers.set("x-rapidapi-host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRelatedArtist: builder.query({
      query: ({ id, locale = "en-US" }) => ({
        url: "artists/get-top-songs",
        params: { id, l: locale },
      }),
    }),
    searchSongs: builder.query({
      query: ({ term, locale = "en-US", offset = 0, limit = 10 }) => ({
        url: "search",
        params: { term, locale, offset, limit },
      }),
    }),
  }),
});

export const { useGetRelatedArtistQuery, useLazySearchSongsQuery } = shazamApi;
