
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/category.js';
import { createRequest } from '../../notification/middlewares/notification.js';
import { updateRequest } from '../middlewares/category.js';
const router = Router();

// Create category
router.post("/api/categories", [createRequest], create);

// List categories
router.get("/api/categories", [], find);

// List Single category
router.get("/api/categories/:id", [], findOne);

// Update categories
router.put("/api/categories/:id", [updateRequest], update);

// Delete category
router.delete("/api/categories/:id", [], destroy);

export default router;
