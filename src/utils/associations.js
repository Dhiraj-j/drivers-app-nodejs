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
// syncing tables 
sequelize.sync({ alter: true }).then(() => {
    console.log("database initialized!")
}).catch((error) => {
    console.log(error)
})
// process.exit()