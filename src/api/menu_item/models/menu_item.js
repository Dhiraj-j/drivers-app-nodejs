
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Menu_item = sequelize.define("Menu_item", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    thumbnail: {
        type: DataTypes.STRING,
    },
    gallery: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    preferences: {
        type: DataTypes.ENUM("VEG", "NON-VEG", "EGG"),
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Menu_item.sync();

export default Menu_item;
