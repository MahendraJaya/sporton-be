import {Router} from "express";
import {createCategory, deleteCategory, getCategoryById, getCategories, updateCategory} from "../controllers/category.controller";
import {authenticate} from "../middleware/auth.middleware";
import {upload} from "../middleware/upload.middleware";

const router = Router();

router.post("/",  upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", authenticate, upload.single("image"), updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;