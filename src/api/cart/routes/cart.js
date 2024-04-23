
import { Router } from 'express';
import { addToCart, userCart, removeItemFromCart, increaseQuantity, decreaseQuantity } from '../controllers/cart.js';
const router = Router();

router.post("/api/carts/add-to-cart", [], addToCart);

router.get("/api/carts/my-cart", [], userCart);

router.delete("/api/carts/remove/:menu_item_id", [], removeItemFromCart);
router.put("/api/carts/decrease/:menu_item_id", [], decreaseQuantity);
router.put("/api/carts/increase/:menu_item_id", [], increaseQuantity);

export default router;
