
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/menu_category.js';
const router = Router();

// Create menu_category
router.post("/api/menu-categories", [], create);

// List menu-categories
router.get("/api/menu-categories", [], find);

// List Single menu_category
router.get("/api/menu-categories/:id", [], findOne);

// Update menu-categories
router.put("/api/menu-categories/:id", [], update);

// Delete menu_category
router.delete("/api/menu-categories/:id", [], destroy);

export default router;
