
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/menu_category.js';
const router = Router();

router.post("/api/menu-categories", [], create);

router.get("/api/menu-categories", [], find);

router.get("/api/menu-categories/store/:store_id", [], find);

router.get("/api/menu-categories/:id", [], findOne);

router.put("/api/menu-categories/:id", [], update);

router.delete("/api/menu-categories/:id", [], destroy);

export default router;
