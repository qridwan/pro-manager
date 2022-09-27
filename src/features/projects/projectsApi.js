import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) => `/projects?members_like=${email}`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
        } catch (err) {}
      },
    }),

    addProject: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const project = await queryFulfilled;
        if (project?.data?.id) {
          // when add new converstation draft will be update
          dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              arg.sender,
              (draft) => {
                draft.push(project.data);
              }
            )
          );
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ sender, id }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const projects = await queryFulfilled;
        console.log("projects: ", projects);
        // if (projects?.data?.id) {
        //   // when add new converstation draft will be update
        //   dispatch(
        //     apiSlice.util.updateQueryData(
        //       "getProjects",
        //       arg.sender,
        //       (draft) => {
        //         draft.push(project.data);
        //       }
        //     )
        //   );
        // }
      },
    }),
    // getQueryTeams: builder.query({
    //   query: (team) => `/teams?uid=${team.toLowerCase()}`,
    // }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
