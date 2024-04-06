
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/notification.js';
const router = Router();

// Create notification
router.post("/api/notifications", [], create);

// List notifications
router.get("/api/notifications", [], find);

// List Single notification
router.get("/api/notifications/:id", [], findOne);

// Update notifications
router.put("/api/notifications/:id", [], update);

// Delete notification
router.delete("/api/notifications/:id", [], destroy);

export default router;
