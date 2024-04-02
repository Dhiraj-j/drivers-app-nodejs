
import { Router } from 'express';
import { create, find, update, destroy, findOne, getUsersChatMessaages, getUsersChat } from '../controllers/chat.js';
const router = Router();

// Create chat
router.post("/api/chats", [], create);

// List chats
router.get("/api/chats", [], getUsersChat);

// List Single chat
router.get("/api/chats/:id", [], findOne);
router.get("/api/chats/:id/messaages", [], getUsersChatMessaages);

// Update chats
router.put("/api/chats/:id", [], update);

// Delete chat
router.delete("/api/chats/:id", [], destroy);

export default router;
