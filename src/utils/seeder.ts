import mongoose from "mongoose";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/analytics_dashboard"

const categories = ["Technology", "Health", "Travel", "Education", "Finance"];

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = (daysBack = 60) => {
  const date = new Date();
  date.setDate(date.getDate() - randomNumber(0, daysBack));
  return date;
};

export async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Clear old data
    await User.deleteMany({});
    await Blog.deleteMany({});

    // ---- Create Users ----
    const users = await User.insertMany(
      Array.from({ length: 20 }).map((_, i) => ({
        name: `User ${i + 1}`,
        email: `user${i + 1}@test.com`,
        password: "password123",
        role: i === 0 ? "admin" : "user",
        isActive: Math.random() > 0.2,
        createdAt: randomDate()
      }))
    );

    console.log("Users seeded:", users.length);

    // ---- Create Blogs ----
    const blogs = [];

    for (let i = 0; i < 100; i++) {
      const author = users[randomNumber(0, users.length - 1)];

      blogs.push({
        title: `Blog Post ${i + 1}`,
        content: "This is dummy blog content",
        authorId: author._id,
        category: categories[randomNumber(0, categories.length - 1)],
        tags: ["analytics", "dashboard"],
        views: randomNumber(10, 500),
        likes: randomNumber(0, 100),
        commentsCount: randomNumber(0, 50),
        createdAt: randomDate()
      });
    }

    await Blog.insertMany(blogs);
    console.log("Blogs seeded:", blogs.length);

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
}