import { Request, Response } from "express";
import User from "../../models/User.js";

export const usersGrowth = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate } = req.query;

        const match: any = {};
        if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = new Date(startDate as string);
        if (endDate) match.createdAt.$lte = new Date(endDate as string);
        }

        const data = await User.aggregate([
        { $match: match },
        {
            $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            users: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } },
        {
            $project: {
            _id: 0,
            date: "$_id",
            users: 1,
            },
        },
        ]);

        res.json({ data });
    } catch (error) {
        return res.json({
            success: false,
            message: "Internal Server Error"
        })
    }
}