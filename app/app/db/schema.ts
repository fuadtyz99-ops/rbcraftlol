import { mysqlTable, serial, varchar, timestamp, text, int } from "drizzle-orm/mysql-core";

export const players = mysqlTable("players", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  uuid: varchar("uuid", { length: 255 }),
  rank: varchar("rank", { length: 50 }).default("default"),
  playTime: int("play_time").default(0),
  balance: int("balance").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const rankPurchases = mysqlTable("rank_purchases", {
  id: serial("id").primaryKey(),
  playerName: varchar("player_name", { length: 255 }).notNull(),
  rankName: varchar("rank_name", { length: 50 }).notNull(),
  price: int("price").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const serverStatus = mysqlTable("server_status", {
  id: serial("id").primaryKey(),
  isOnline: int("is_online").default(1),
  playerCount: int("player_count").default(0),
  maxPlayers: int("max_players").default(100),
  uptime: varchar("uptime", { length: 50 }),
  version: varchar("version", { length: 50 }),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = mysqlTable("testimonials", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
});
