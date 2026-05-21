import { createRouter, publicQuery } from "./middleware";
import {
  playersRouter,
  rankPurchasesRouter,
  serverStatusRouter,
  testimonialsRouter,
} from "./routers/players";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  players: playersRouter,
  rankPurchases: rankPurchasesRouter,
  serverStatus: serverStatusRouter,
  testimonials: testimonialsRouter,
});

export type AppRouter = typeof appRouter;
