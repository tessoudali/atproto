import { Server } from '../../../../lexicon'
import AppContext from '../../../../context'

export default function (server: Server, ctx: AppContext) {
  server.app.bsky.feed.getListFeed({
    auth: ctx.accessVerifier,
    handler: async ({ auth, params }) => {
      const requester = auth.credentials.did
      const res = await ctx.appviewAgent.api.app.bsky.feed.getListFeed(
        params,
        await ctx.serviceAuthHeaders(requester),
      )
      return {
        encoding: 'application/json',
        body: res.data,
      }
    },
  })
}
