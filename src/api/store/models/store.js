
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Store = sequelize.define("Store", {
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
    }
});

Store.sync();

export default Store;
