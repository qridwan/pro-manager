import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (email) => `/teams?members_like=${email}`,
      //   async onQueryStarted({ }, { queryFulfilled, dispatch }) {})
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
        } catch (err) {}
      },
    }),

    addTeam: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/teams",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const team = await queryFulfilled;
        if (team?.data?.id) {
          // when add new converstation draft will be update
          dispatch(
            apiSlice.util.updateQueryData("getTeams", arg.sender, (draft) => {
              draft.push(team.data);
            })
          );
        }
      },
    }),
    getQueryTeams: builder.query({
      query: (team) => `/teams?uid=${team.toLowerCase()}`,
    }),
    addNewTeamMember: builder.mutation({
      query: ({ id, data, sender }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data, // {members: ["", "", ""]}
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const updatedTeam = await queryFulfilled;
        if (updatedTeam?.data.id) {
          // when add new member, draft will be update
          dispatch(
            apiSlice.util.updateQueryData("getTeams", arg.sender, (draft) => {
              const filterDraftedTeams = draft.filter(
                (t) => t.id !== updatedTeam.data.id
              );
              return [...filterDraftedTeams, updatedTeam.data];
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useGetQueryTeamsQuery,
  useAddNewTeamMemberMutation
} = teamsApi;
