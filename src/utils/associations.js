import sequelize from "../../database/index.js";
import User from "../api/user/models/user.js";
import Otp from "../api/otp/models/otp.js";
import Restaurant from './../api/restaurant/models/restaurant.js';
import Vehicle from './../api/vehicle/models/vehicle.js';
import Message from './../api/message/models/message.js';
import Chat from './../api/chat/models/chat.js';
import Notification from './../api/notification/models/notification.js';


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
// syncing tables 
sequelize.sync({ alter: true }).then(() => {
    console.log("database initialized!")
}).catch((error) => {
    console.log(error)
})
// process.exit()