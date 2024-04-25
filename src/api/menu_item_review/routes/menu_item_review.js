
import { Router } from 'express';
import { create, find, update, destroy, findOne, findByMenuItemId } from '../controllers/menu_item_review.js';
import { createRequest } from '../middlewares/menu_item_review.js';
const router = Router();

router.post("/api/menu-item-reviews", [createRequest], create);

router.get("/api/menu-item-reviews", [], find);

router.get("/api/menu-item-reviews/menu-item/:menu_item_id", [], findByMenuItemId);

router.get("/api/menu-item-reviews/:id", [], findOne);

router.put("/api/menu-item-reviews/:id", [], update);

router.delete("/api/menu-item-reviews/:id", [], destroy);

export default router;
