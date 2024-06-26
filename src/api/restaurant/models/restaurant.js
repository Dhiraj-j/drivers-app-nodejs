
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Restaurant = sequelize.define("Restaurant", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    },
    logo: {
        type: DataTypes.STRING,
    },
    latitude: {
        type: DataTypes.FLOAT,
    },
    longitude: {
        type: DataTypes.FLOAT,
    },
    opening_time: {
        type: DataTypes.TIME,
    },
    closing_time: {
        type: DataTypes.TIME,
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    }
});

Restaurant.sync();

export default Restaurant;
