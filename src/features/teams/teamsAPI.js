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
              draft.unshift(team);
            })
          );
        }
      },
    }),
  }),
});

export const { useGetTeamsQuery, useAddTeamMutation } = teamsApi;
