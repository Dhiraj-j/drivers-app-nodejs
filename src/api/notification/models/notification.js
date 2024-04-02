
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Notification = sequelize.define("Notification",{
        
    message: {
        type: DataTypes.TEXT,
    },
    isRead: {
        type: DataTypes.BOOLEAN,
    }
});

Notification.sync();

export default Notification;
          