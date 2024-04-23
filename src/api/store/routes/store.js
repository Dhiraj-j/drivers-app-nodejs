
import { Router } from 'express';
import { create, find, update, destroy, findOne, deleteMenuCategory, addMenuCategory } from '../controllers/store.js';
import { createRequest, updateRequest } from '../middlewares/store.js';
const router = Router();

router.post("/api/stores", [createRequest], create);

router.get("/api/stores", [], find);

router.get("/api/stores/:id", [], findOne);

router.put("/api/stores/:id", [updateRequest], update);

router.delete("/api/stores/:id", [], destroy);

router.delete("/api/stores/:id/:menu_category_id", deleteMenuCategory)

router.post("/api/stores/:id/:menu_category_id", addMenuCategory)

export default router;
