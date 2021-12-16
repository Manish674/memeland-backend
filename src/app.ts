import express from "express";
import tourRoute from "./routes/user.routes";
const app = express();

app.use(express.json());
app.use('/api/v1/users', tourRoute);

export default app;
