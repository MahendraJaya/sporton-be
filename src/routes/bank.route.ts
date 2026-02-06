import { Router } from "express";
import {
  createBank,
  deleteBank,
  getBanks,
  getBanksById,
  updateBank,
} from "../controllers/bank.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/",  createBank);
router.get("/",  getBanks);
router.get("/:id",  getBanksById);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;
