import dotenv from "dotenv"
dotenv.config();

import express, { Application, Request, Response} from "express"
import cors from "cors"
import connectDB from "./config/db-connect.js";
import blogRouter from "./routes/blog-router.js";
import userRouter from "./routes/user-router.js";
import analyticsRouter from "./routes/analytics-router.js";


const app: Application = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/analytics", analyticsRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Working");
});

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`);
})