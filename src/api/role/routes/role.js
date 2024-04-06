
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/role.js';
import { createRequest } from '../middlewares/role.js';
const router = Router();

// Create role
router.post("/api/roles", [createRequest], create);

// List roles
router.get("/api/roles", [], find);

// List Single role
router.get("/api/roles/:id", [], findOne);

// Update roles
router.put("/api/roles/:id", [createRequest], update);

// Delete role
router.delete("/api/roles/:id", [], destroy);

export default router;
