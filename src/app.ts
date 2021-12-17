import express from "express";
import userRoute from "./routes/user.routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/', userRoute);

export default app;
