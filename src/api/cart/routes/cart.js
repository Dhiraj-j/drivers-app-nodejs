
import { Router } from 'express';
import { create, find, update, destroy, findOne } from '../controllers/cart.js';
const router = Router();

// Create cart
router.post("/api/carts/add", [], addToCart);

// List carts
router.get("/api/carts/my-cart", [], myCart);

// List Single cart
router.delete("/api/carts/empty", [], emptyCart);

router.delete("/api/carts/remove/:id", [], removeItem);

export default router;
