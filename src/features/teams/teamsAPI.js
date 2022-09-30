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
        let new_team = arg.data;
        let disp = dispatch(
          apiSlice.util.updateQueryData("getTeams", arg.sender, (draft) => {
            draft.push(new_team);
          })
        );
        try {
          const team = await queryFulfilled;
          if (team?.data?.id) {
          }
        } catch (error) {
          disp.undo();
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
        let u_data = arg.data;
        let func = dispatch(
          apiSlice.util.updateQueryData("getTeams", arg.sender, (draft) => {
            const filterDraftedTeams = draft.filter((t) => t.id !== u_data.id);
            return [...filterDraftedTeams, u_data];
          })
        );
        try {
          const updatedTeam = await queryFulfilled;
          if (updatedTeam?.data.id) {
          }
        } catch (error) {
          func.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useGetQueryTeamsQuery,
  useAddNewTeamMemberMutation,
} = teamsApi;
