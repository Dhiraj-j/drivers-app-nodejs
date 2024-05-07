
import { Router } from 'express';
import { create, find, update, destroy, findOne, getUsersChatMessaages, getUsersChat } from '../controllers/chat.js';
const router = Router();

router.post("/api/chats", [], create);
router.get("/api/chats", [], getUsersChat);
router.get("/api/chats/:id", [], findOne);
router.get("/api/chats/:id/messages", [], getUsersChatMessaages);
router.put("/api/chats/:id", [], update);
router.delete("/api/chats/:id", [], destroy);

export default router;
