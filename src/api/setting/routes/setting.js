
import { Router } from 'express';
import { create, find } from '../controllers/setting.js';
const router = Router();

router.post("/api/settings", [], create);
router.get("/api/settings", [], find);

export default router;
