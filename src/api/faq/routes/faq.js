
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/faq.js';
const router = Router();

router.post("/api/faqs", [], create);

router.get("/api/faqs", [], find);

router.get("/api/faqs/:id", [], findOne);

router.put("/api/faqs/:id", [], update);

router.delete("/api/faqs/:id", [], destroy);

export default router;
