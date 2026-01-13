import { Router } from "express";
import { usersGrowth } from "../controllers/analytics/user-controller.js";
import { blogsByCategory, blogsCreated, engagementTrend } from "../controllers/analytics/blog-controller.js";
import { summary } from "../controllers/analytics/common.js";

const analyticsRouter = Router();

analyticsRouter.get("/users-growth", usersGrowth); //can accept ?startDate=2025-01-01&endDate=2025-01-31
analyticsRouter.get("/blogs-created", blogsCreated); //can ?groupBy=day | month
analyticsRouter.get("/blogs-by-category", blogsByCategory);
analyticsRouter.get("/engagement-trend", engagementTrend);
analyticsRouter.get("/summary", summary);
 

export default analyticsRouter;