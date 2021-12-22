import express from "express";
import extractJWT from "../middlewares/extractJWT";
import { registerUser, loginUser, validate } from "../controllers/user.controller";

const router = express.Router();

router.route('/validate').get(extractJWT, validate);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
