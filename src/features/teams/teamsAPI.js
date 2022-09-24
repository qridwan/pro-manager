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

    // editTeams: builder.mutation({
    //   query: ({ id, data, sender }) => ({
    //     url: `/teams/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
    //     // optimistic cache update start
    //     // const pathResult = dispatch(
    //     //   apiSlice.util.updateQueryData("getTeams", arg.sender, (draft) => {
    //     //     const draftConversation = draft.data.find((c) => c.id == arg.id);
    //     //     draftConversation.message = arg.data.message;
    //     //     draftConversation.timestamp = arg.data.timestamp;
    //     //   })
    //     // );
    //     // optimistic cache update end
    //     try {
    //       const teams = await queryFulfilled;
    //       if (teams?.data?.id) {
    //         // silent entry to message table
    //         const users = arg.data.users;
    //         const senderUser = users.find((user) => user.email === arg.sender);
    //         const receiverUser = users.find(
    //           (user) => user.email !== arg.sender
    //         );
    //         const res = await dispatch(
    //           messagesApi.endpoints.addMessage.initiate({
    //             conversationId: conversation?.data?.id,
    //             sender: senderUser,
    //             receiver: receiverUser,
    //             message: arg.data.message,
    //             timestamp: arg.data.timestamp,
    //           })
    //         ).unwrap();
    //         // update messages cache pessimistically start
    //         // dispatch(
    //         //   apiSlice.util.updateQueryData(
    //         //     "getTeams",
    //         //     res.conversationId.toString(),
    //         //     (draft) => {
    //         //       draft.data.push(res);
    //         //     }
    //         //   )
    //         // );
    //         // update messages cache pessimistically end
    //       }
    //     } catch (err) {
    //       pathResult.undo();
    //     }
    //   },
    // }),
  }),
});

export const { useGetTeamsQuery } = teamsApi;
