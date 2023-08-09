import apiSlice from "./apiSlice";
import { USER_URL } from "../../utils/constant";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: USER_URL,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: USER_URL,
        method: "DELETE",
        body: id,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: USER_URL,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApiSlice;
