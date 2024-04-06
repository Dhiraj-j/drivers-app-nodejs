
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/restaurant.js';
import { createRequest } from '../middlewares/restaurant.js';
const router = Router();

// Create restaurant
router.post("/api/restaurants", [createRequest], create);

// List restaurants
router.get("/api/restaurants", [], find);

// List Single restaurant
router.get("/api/restaurants/:id", [], findOne);

// Update restaurants
router.put("/api/restaurants/:id", [], update);

// Delete restaurant
router.delete("/api/restaurants/:id", [], destroy);

export default router;
