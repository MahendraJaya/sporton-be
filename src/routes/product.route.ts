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

router.get("/", getProducts);
router.get("/:id",  getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
