import express from "express";
const app = express();
import path from 'path'
import morgan from "morgan";
import "./src/utils/associations.js"
// importing routes 
import user from "./src/api/user/routes/user.js";
import chat from "./src/api/chat/routes/chat.js";
import upload from "./src/api/upload/upload.js"
import restaurant from './src/api/restaurant/routes/restaurant.js'
import category from './src/api/category/routes/category.js'
import store_type from './src/api/store_type/routes/store_type.js'
import store from './src/api/store/routes/store.js'
import role from './src/api/role/routes/role.js'
import packge from "./src/api/package/routes/package.js"
import package_category from "./src/api/package_category/routes/package_category.js"
import vehicle from "./src/api/vehicle/routes/vehicle.js"
import menu_category from "./src/api/menu_category/routes/menu_category.js"
import menu_item from "./src/api/menu_item/routes/menu_item.js"
import faq from "./src/api/faq/routes/faq.js"
import privacy_policy from "./src/api/privacy_policy/routes/privacy_policy.js"
import setting from './src/api/setting/routes/setting.js';
import cart from './src/api/cart/routes/cart.js'
import cors from 'cors'
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['*'], // Only allow GET requests
    allowedHeaders: ['Content-Type', 'Authorization', "authorization"], // Specify allowed headers
    maxAge: 600,
}))
app.use(morgan("dev"))
app.use(express.json())
app.use("/public", express.static(path.join(process.cwd(), "public")))
app.use(user)
app.use(chat)
app.use(upload)
app.use(restaurant)
app.use(category)
app.use(store_type)
app.use(store)
app.use(role)
app.use(packge)
app.use(package_category)
app.use(vehicle)
app.use(menu_category)
app.use(menu_item)
app.use(faq)
app.use(privacy_policy)
app.use(setting)
app.use(cart)
export default app