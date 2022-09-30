import { apiSlice } from "../api/apiSlice";
import { setSearchedData } from "./projectSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (email) => `/projects?members_like=${email}`,
      providesTags: ["projects"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
        } catch (err) {}
      },
    }),

    searchProjects: builder.query({
      query: ({ email, title }) =>
        `/projects?members_like=${email}&&title_like=${title}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            setSearchedData({
              data: result.data,
              keyword: arg.title,
            })
          );
        } catch (err) {
          // do nothing
        }
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
    updateProjectStatus: builder.mutation({
      query: ({ sender, data, id }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const u_data = arg.data;
        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", arg.sender, (draft) => {
            const filteredProjects = draft.filter(
              (project) => project.id != u_data.id
            );
            return [...filteredProjects, u_data];
          })
        );
        try {
          const updatedProject = await queryFulfilled;
          if (updatedProject.data.id) {
            // update project from draft when status will patched from dnd
          }
        } catch (error) {
          pathResult.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ sender, id }) => ({
        url: `/projects/${id}`,
        method: "GET", // DELETE method causing issues, it removes all project items
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const id = arg.id;
        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", arg.sender, (draft) => {
            const filteredProjects = draft.filter(
              (project) => project.id != id
            );
            return [...filteredProjects];
          })
        );
        try {
          const updatedProject = await queryFulfilled;
          // console.log("updatedProject: ", updatedProject);
        } catch (error) {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
  useSearchProjectsQuery,
} = projectsApi;
