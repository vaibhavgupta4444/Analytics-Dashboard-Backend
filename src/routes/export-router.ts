import { Router } from "express";
import { exportUsersToExcel } from "../controllers/exports/export-user.js";
import { exportBlogsToExcel } from "../controllers/exports/export-blog.js";

const exportRouter = Router();

exportRouter.get("/users", exportUsersToExcel);
exportRouter.get("/blogs", exportBlogsToExcel);

export default exportRouter;