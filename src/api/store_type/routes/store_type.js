
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/store_type.js';
import { createRequest } from '../middlewares/store_type.js';
import { updateRequest } from '../../user/middlewares/user.js';
const router = Router();

// Create store_type
router.post("/api/store-types", [createRequest], create);

// List store-types
router.get("/api/store-types", [], find);

// List Single store_type
router.get("/api/store-types/:id", [], findOne);

// Update store-types
router.put("/api/store-types/:id", [updateRequest], update);

// Delete store_type
router.delete("/api/store-types/:id", [], destroy);

export default router;
