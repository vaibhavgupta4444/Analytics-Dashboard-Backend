import { Schema } from "mongoose";
import { Base } from "./base";

export interface IBlog extends Base {
  title: string;
  content: string;

  authorId: Schema.Types.ObjectId;

  category: string;
  tags: string[];

  status: "draft" | "published";

  views: number;
  likes: number;
  commentsCount: number;
}
