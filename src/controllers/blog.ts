import { Request, Response } from "express";
import Blog from "../models/Blog.js";

export const getBlogs = async (req:Request, res: Response) => {
    try {
        const blogs = await Blog.find();
        return res.status(200).json({ success: true, data: blogs });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
    }
}

export const getSingleBlog = async (req: Request, res: Response) => {
    try {
        const blog = await Blog.findById(req.params._id);
        return res.status(200).json({ success: true, data: blog });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch blog" });
    }
}