import { Router } from 'express';
import { create, find } from '../controllers/privacy_policy.js';
import { createRequest } from '../middlewares/privacy_policy.js';
const router = Router();

router.post("/api/privacy-policy", [createRequest], create);
router.get("/api/privacy-policy", [], find);
export default router;
