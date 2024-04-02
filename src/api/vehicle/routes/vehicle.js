
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/vehicle.js';
const router = Router();

// Create vehicle
router.post("/api/vehicles", [], create);

// List vehicles
router.get("/api/vehicles", [], find);

// List Single vehicle
router.get("/api/vehicles/:id", [], findOne);

// Update vehicles
router.put("/api/vehicles/:id", [], update);

// Delete vehicle
router.delete("/api/vehicles/:id", [], destroy);

export default router;
