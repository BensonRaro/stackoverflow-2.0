import { int, varchar, mysqlTable, timestamp } from "drizzle-orm/mysql-core";

export const Users = mysqlTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  clerkId: varchar("clerkId", { length: 256 }).unique(), // Changed to varchar
  name: varchar("name", { length: 256 }),
  username: varchar("username", { length: 256 }),
  email: varchar("email", { length: 256 }),
  bio: varchar("bio", { length: 1000 }),
  picture: varchar("picture", { length: 1000 }),
  location: varchar("location", { length: 256 }),
  portfolioWebsite: varchar("portfolioWebsite", { length: 256 }),
  reputation: int("reputation"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Saved = mysqlTable("saved", {
  id: varchar("id", { length: 256 }).primaryKey(),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
  contentId: varchar("contentId", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Upvote = mysqlTable("upvote", {
  id: varchar("id", { length: 256 }).primaryKey(),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
  contentId: varchar("contentId", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Downvote = mysqlTable("downvote", {
  id: varchar("id", { length: 256 }).primaryKey(),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
  contentId: varchar("contentId", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export const Question = mysqlTable("question", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("title", { length: 256 }),
  explanation: varchar("content", { length: 1000 }),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const Tags = mysqlTable("tag", {
  id: varchar("id", { length: 256 }).primaryKey(),
  tag: varchar("tag", { length: 256 }),
  questionId: varchar("questionId", { length: 256 }),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const Answer = mysqlTable("answer", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("title", { length: 256 }),
  content: varchar("content", { length: 1000 }),
  clerkId: varchar("clerkId", { length: 256 })
    .references(() => Users.clerkId, {
      onDelete: "cascade",
      onUpdate: "no action",
    })
    .notNull(),
});
