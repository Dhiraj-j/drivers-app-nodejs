
import { Router } from 'express';
import { create, find, update, destroy, findOne, findByStoreId } from '../controllers/store_review.js';
import { createRequest } from '../middlewares/store_review.js';
const router = Router();

router.post("/api/store-reviews", [createRequest], create);

router.get("/api/store-reviews", [], find);

router.get("/api/store-reviews/store/:store_id", [], findByStoreId);

router.get("/api/store-reviews/:id", [], findOne);

router.put("/api/store-reviews/:id", [], update);

router.delete("/api/store-reviews/:id", [], destroy);

export default router;
