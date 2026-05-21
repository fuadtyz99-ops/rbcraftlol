import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { players, rankPurchases, serverStatus, testimonials } from "@db/schema";
import { eq } from "drizzle-orm";

export const playersRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(players);
  }),

  getByUsername: publicQuery
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(players)
        .where(eq(players.username, input.username));
      return result[0] || null;
    }),

  create: publicQuery
    .input(
      z.object({
        username: z.string().min(1).max(255),
        uuid: z.string().optional(),
        rank: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(players).values({
        username: input.username,
        uuid: input.uuid,
        rank: input.rank || "default",
      });
      return { success: true };
    }),
});

export const rankPurchasesRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(rankPurchases);
  }),

  create: publicQuery
    .input(
      z.object({
        playerName: z.string().min(1),
        rankName: z.string().min(1),
        price: z.number().int().positive(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(rankPurchases).values({
        playerName: input.playerName,
        rankName: input.rankName,
        price: input.price,
        status: "pending",
      });
      return { success: true };
    }),
});

export const serverStatusRouter = createRouter({
  get: publicQuery.query(async () => {
    const db = getDb();
    const result = await db.select().from(serverStatus);
    return (
      result[0] || {
        isOnline: 1,
        playerCount: 0,
        maxPlayers: 100,
        uptime: "99.9%",
        version: "1.20.4",
      }
    );
  }),

  update: publicQuery
    .input(
      z.object({
        isOnline: z.number().int().optional(),
        playerCount: z.number().int().optional(),
        maxPlayers: z.number().int().optional(),
        uptime: z.string().optional(),
        version: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(serverStatus).values({
        isOnline: input.isOnline ?? 1,
        playerCount: input.playerCount ?? 0,
        maxPlayers: input.maxPlayers ?? 100,
        uptime: input.uptime,
        version: input.version,
      });
      return { success: true };
    }),
});

export const testimonialsRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(testimonials);
  }),

  create: publicQuery
    .input(
      z.object({
        text: z.string().min(1),
        author: z.string().min(1),
        role: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(testimonials).values({
        text: input.text,
        author: input.author,
        role: input.role,
      });
      return { success: true };
    }),
});
