import { model, Schema } from "mongoose";
import { IBlog } from "../interfaces/blog-interface";

const BlogSchema = new Schema<IBlog>(
  {
    title: String,
    content: String,
    authorId: { type: Schema.Types.ObjectId, ref: "User" },
    category: String,
    tags: [String],
    status: { type: String, default: "published" },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Blog = model<IBlog>("Blog", BlogSchema);

export default Blog;