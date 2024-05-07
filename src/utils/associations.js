import sequelize from "../../database/index.js";
import User from "../api/user/models/user.js";
import Otp from "../api/otp/models/otp.js";
import Restaurant from './../api/restaurant/models/restaurant.js';
import Vehicle from './../api/vehicle/models/vehicle.js';
import Message from './../api/message/models/message.js';
import Chat from './../api/chat/models/chat.js';
import Notification from './../api/notification/models/notification.js';
import Role from "./../api/role/models/role.js"
import Store_type from './../api/store_type/models/store_type.js'
import Store from './../api/store/models/store.js';
import Package_category from "../api/package_category/models/package_category.js";
import Package from "../api/package/models/package.js";
import Menu_category from "../api/menu_category/models/menu_category.js";
import Menu_item from "../api/menu_item/models/menu_item.js";
import Cart from "../api/cart/models/cart.js";
import CartItem from './../api/cart/models/cartItem.js';
import Store_review from "../api/store_review/models/store_review.js";
import Menu_item_review from "../api/menu_item_review/models/menu_item_review.js";
// Role and User 
Role.hasMany(User, { foreignKey: "RoleId", as: "users" })
User.belongsTo(Role, { foreignKey: "RoleId", as: "role" })

User.hasMany(Vehicle, { foreignKey: "UserId", as: "vehicles" })
Vehicle.belongsTo(User, { foreignKey: "UserId", as: "owner" })
User.hasOne(Otp, { foreignKey: "UserId", as: "otp" })
Otp.belongsTo(User, { foreignKey: "UserId", as: "user" })

// chat associations

User.belongsToMany(Chat, { as: "chats", through: "UserChat", foreignKey: "UserId" })
Chat.belongsToMany(User, { as: "users", through: "UserChat", foreignKey: "ChatId" })
Chat.hasMany(Message, { as: "messages", foreignKey: "ChatId" })
Message.belongsTo(Chat, { foreignKey: "ChatId", as: "chat" })
Message.belongsTo(User, { foreignKey: "UserId", as: "sender" })

// Store and Type 
Store_type.hasMany(Store, { foreignKey: "StoreTypeId", as: "stores" })
Store.belongsTo(Store_type, { foreignKey: "StoreTypeId", as: "store_type" })

//package and category
Package_category.hasMany(Package, { foreignKey: "PackageCategoryId", as: "packages" })
Package.belongsTo(Package_category, { foreignKey: "PackageCategoryId", as: "package_category" })

//menu item and menu category

// Store.belongsToMany(Menu_category, { through: "Store_menu_category", as: "menu_categories" })
// Menu_category.belongsToMany(Store, { through: "Store_menu_category", as: "stores" })
Store.hasMany(Menu_category, { foreignKey: "StoreId", as: "menu_categories" })
Menu_category.belongsTo(Store, { foreignKey: "StoreId", as: "stores" })

Menu_item.belongsTo(Menu_category, { as: "menu_category", foreignKey: "MenuCategoryId" })
Menu_category.hasMany(Menu_item, { as: 'menu_items', foreignKey: "MenuCategoryId" })

// Store.hasMany(Menu_item, { as: "menu_items", foreignKey: "StoreId" })
// Menu_item.belongsTo(Store, { as: "store", foreignKey: "StoreId" })

// user cart and menu items
Cart.belongsToMany(Menu_item, { through: CartItem, foreignKey: "CartId", as: "items" })
Menu_item.belongsToMany(Cart, { through: CartItem, foreignKey: "MenuItemId", as: "carts" })
User.hasOne(Cart, { as: "cart", foreignKey: "UserId" })
Cart.belongsTo(User, { as: "user", foreignKey: "UserId" })

// review and rating
Store.hasMany(Store_review, { foreignKey: "StoreId", as: "review" })
Store_review.belongsTo(Store, { foreignKey: "StoreId", as: "store" })

User.hasMany(Store_review, { foreignKey: "UserId", as: "reviews" })
Store_review.belongsTo(User, { foreignKey: "UserId", as: "user" })

//menu items reviews

Menu_item.hasMany(Menu_item_review, { foreignKey: "MenuItemId", as: "reviews" });
Menu_item_review.belongsTo(Menu_item, { foreignKey: "MenuItemId", as: "menu_item" })

User.hasMany(Menu_item_review, { foreignKey: "UserId", as: "menu_item_reviews" })
Menu_item_review.belongsTo(User, { foreignKey: "UserId", as: "user" })



// syncing tables
sequelize.sync({ alter: true }).then(() => {
    console.log("database initialized!")
}).catch((error) => {
    console.log(error)
})
// process.exit()