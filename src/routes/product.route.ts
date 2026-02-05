import { Router } from "express";

const router = Router();

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";
import { upload } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/auth.middleware";

router.get("/", getProducts);
router.get("/:id",  getProductById);
router.post("/", authenticate,upload.single("image"), createProduct);
router.put("/:id", authenticate,upload.single("image"), updateProduct);
router.delete("/:id", authenticate,deleteProduct);

export default router;
