import { apiSlice } from "../api/apiSlice";
import { setSearchedData } from "./projectSlice";

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
        const updatedProject = await queryFulfilled;
        console.log("updatedProject: ", updatedProject);
        if (updatedProject.data.id) {
          // update project from draft when status will patched from dnd
          dispatch(
            apiSlice.util.updateQueryData(
              "getProjects",
              arg.sender,
              (draft) => {
                const filteredProjects = draft.filter(
                  (project) => project.id != updatedProject?.data?.id
                );
                return [...filteredProjects, updatedProject.data];
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
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
  useSearchProjectsQuery,
} = projectsApi;
