import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '46d9ce6657msh3510971bb9c8d21p1fbb00jsn91ed639b28b8',
// 		'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
// 	}
// };

// fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "46d9ce6657msh3510971bb9c8d21p1fbb00jsn91ed639b28b8"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({ query: () => "/charts/track" }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/songs/list-recommendations?key=${songid}`,
    }),
    getArtistDetail: builder.query({
      query: ({ artistId }) => `/artists/get-summary?id=${artistId}`,
    }),
    getSongByCountry: builder.query({
      query: ({ country }) => `/charts/track?locale=${country}`,
    }),
    getSongBySearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailQuery,
  useGetSongByCountryQuery,
  useGetSongBySearchQuery,
} = shazamCoreApi;
