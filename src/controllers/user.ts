import { Request, Response } from "express";
import User from "../models/User.js";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params._id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch users" });
    }
}