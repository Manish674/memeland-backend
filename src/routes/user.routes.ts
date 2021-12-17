import express from "express";
import extractJWT from "../middlewares/extractJWT";
import { registerUser, loginUser } from "../controllers/user.controller";

const router = express.Router();

router.route('/validate').get(extractJWT,registerUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
