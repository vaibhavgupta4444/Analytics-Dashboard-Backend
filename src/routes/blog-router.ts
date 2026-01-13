import { Router } from "express";
import { getBlogs, getSingleBlog } from "../controllers/blog.js";

const blogRouter = Router();

blogRouter.get('/', getBlogs);
blogRouter.get('/:id', getSingleBlog);

export default blogRouter;