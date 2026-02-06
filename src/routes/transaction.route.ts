import { Router } from "express";
import { upload } from "../middleware/upload.middleware";
import { createTransaction, getTransactionById, getTransactions, updateTransaction } from "../controllers/transaction.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/checkout", upload.single("image"), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", authenticate, getTransactionById);
router.patch("/:id", authenticate, upload.single("image"), updateTransaction);

export default router;