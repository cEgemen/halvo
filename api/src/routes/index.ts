import {AuthRouter, api} from "@/modules/auth/index.js";
import {Router} from "express";

const router = Router();

router.use(api, AuthRouter);

export default router;