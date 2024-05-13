
import { Router } from 'express';
import { create, find, update, destroy, findOne, getMe, login, forgetPassword, resetPassword, search, createCutomer } from '../controllers/user.js';
import { createRequest, forgetRequest, loginRequest, resetRequest, updateRequest } from '../middlewares/user.js';
import { upload } from './../../../utils/upload.js';
const router = Router();

router.post("/api/users", [createRequest], create);
router.post("/api/users/register/customer", [createRequest], createCutomer);
router.get("/api/users", [], find);
router.get("/api/users/me", [], getMe);
router.post("/api/users/login", [loginRequest], login);
router.post("/api/users/forget-password", [forgetRequest], forgetPassword);
router.post("/api/users/reset-password", [resetRequest], resetPassword);
router.get("/api/users/:id", [], findOne);
router.put("/api/users/:id", [updateRequest], update);
router.delete("/api/users/:id", [], destroy);
router.get("/api/users/search/:query", [], search);

export default router;
