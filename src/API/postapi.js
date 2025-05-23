import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts",
      providesTags: ["Post"],
    }),

    addPost: builder.mutation({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      async onQueryStarted(newPost, { dispatch, queryFulfilled }) {
        try {
          const { data: addedPost } = await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.push(addedPost);
            })
          );
        } catch {}
      },
    }),

    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              return draft.filter((post) => post.id !== id);
            })
          );
        } catch {}
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
