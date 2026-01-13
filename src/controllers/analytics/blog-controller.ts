import { Request, Response } from "express";
import Blog from "../../models/Blog.js";

export const blogsCreated = async (req: Request, res: Response) => {
  try {
    const { groupBy = "day" } = req.query;

    let format = "%Y-%m-%d";
    if (groupBy === "month") format = "%Y-%m";

    const data = await Blog.aggregate([
      {
        $group: {
          _id: { $dateToString: { format, date: "$createdAt" } },
          blogs: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, period: "$_id", blogs: 1 } },
    ]);

    res.json({ data });
  } catch (err: any) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};

export const blogsByCategory = async (req:Request, res: Response) => {
  try {
    const data = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, category: "$_id", count: 1 } },
    ]);

    res.json({ data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};


export const engagementTrend = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    const match: any = {};
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = new Date(startDate as string);
      if (endDate) match.createdAt.$lte = new Date(endDate as string);
    }

    const data = await Blog.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          engagement: { $sum: { $add: ["$likes", "$commentsCount"] } },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: "$_id", engagement: 1 } },
    ]);

    res.json({ data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({ error: errorMessage });
  }
};