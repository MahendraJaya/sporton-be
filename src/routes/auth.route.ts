import { Router } from "express";
import { initiateAdmin, signin } from "../controllers/user.controller";

const router = Router();

router.post("/signin", signin);
router.post("/initiate-admin", initiateAdmin);

export default router;