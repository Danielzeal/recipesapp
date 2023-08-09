import apiSlice from "./apiSlice";
import { RECIPE_URL } from "../../utils/constant";

export const recipesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRecipe: builder.mutation({
      query: (data) => ({
        url: RECIPE_URL,
        method: "POST",
        body: data,
      }),
    }),
    getRecipes: builder.query({
      query: ({ search_word, pageNumber }) => ({
        url: RECIPE_URL,
        params: {
          search_word,
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Recipe"],
    }),
    getRecipe: builder.query({
      query: (id) => ({
        url: `${RECIPE_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Recipe"],
    }),
    getUserRecipes: builder.query({
      query: (id) => ({
        url: `${RECIPE_URL}/user/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation({
      query: (data) => ({
        url: RECIPE_URL,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPE_URL}/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    getFavorites: builder.query({
      query: (id) => ({
        url: `${RECIPE_URL}/favorites/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Recipe"],
    }),
    getAllFavorites: builder.query({
      query: (id) => ({
        url: `${RECIPE_URL}/user/favorites/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Recipe"],
    }),
    addFavRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPE_URL}/user/add`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    removeFavRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPE_URL}/user/remove`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useGetRecipesQuery,
  useGetRecipeQuery,
  useGetUserRecipesQuery,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useGetFavoritesQuery,
  useAddFavRecipeMutation,
  useRemoveFavRecipeMutation,
  useGetAllFavoritesQuery,
} = recipesApiSlice;
