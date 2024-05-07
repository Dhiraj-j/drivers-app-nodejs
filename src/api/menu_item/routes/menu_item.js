
import { Router } from 'express';
import { create, find, update, destroy, findOne, findStoresMenuItems, findStoresMenuCategoryItems } from '../controllers/menu_item.js';
import { createRequest, updateRequest } from '../middlewares/menu_item.js';
const router = Router();

router.post("/api/menu-items", [createRequest], create);

router.get("/api/menu-items", [], find);

router.get("/api/menu-items/:id", [], findOne);

router.get("/api/menu-items/stores/:store_id", [], findStoresMenuItems);

router.get("/api/menu-items/category/:category_id", [], findStoresMenuCategoryItems);

router.put("/api/menu-items/:id", [updateRequest], update);

router.delete("/api/menu-items/:id", [], destroy);

export default router;
