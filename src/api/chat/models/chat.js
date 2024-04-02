
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Chat = sequelize.define("Chat", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [0, 100] // Limit length to 100 characters
        }
    },
    type: {
        type: DataTypes.ENUM('private', 'group'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

Chat.sync();

export default Chat;
