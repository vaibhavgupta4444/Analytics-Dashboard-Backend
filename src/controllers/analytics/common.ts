import { Request, Response } from "express";
import Blog from "../../models/Blog.js";
import User from "../../models/User.js";

export const summary = async (req:Request, res:Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();

    const viewsAgg = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const engagementAgg = await Blog.aggregate([
      { $group: { _id: null, totalEngagement: { $sum: { $add: ["$likes", "$commentsCount"] } } } },
    ]);

    const totalViews = viewsAgg[0]?.totalViews || 0;
    const totalEngagement = engagementAgg[0]?.totalEngagement || 0;
    const engagementRate = totalViews > 0 ? (totalEngagement / totalViews) * 100 : 0;

    res.json({
      totalUsers,
      totalBlogs,
      totalViews,
      engagementRate: parseFloat(engagementRate.toFixed(2)),
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};
