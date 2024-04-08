
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/package_category.js';
const router = Router();

// Create package_category
router.post("/api/package-categories", [], create);

// List package-categories
router.get("/api/package-categories", [], find);

// List Single package_category
router.get("/api/package-categories/:id", [], findOne);

// Update package-categories
router.put("/api/package-categories/:id", [], update);

// Delete package_category
router.delete("/api/package-categories/:id", [], destroy);

export default router;
