import express from "express";
import { createUser, getUser } from "../controllers/user.controller";

const router = express.Router();

router.route('/').get(getUser).post(createUser);

export default router;
