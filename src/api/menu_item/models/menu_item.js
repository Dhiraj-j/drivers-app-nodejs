
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Menu_item = sequelize.define("Menu_item", {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    cooking_time: {
        type: DataTypes.DECIMAL(10, 1)
    },
    price: {
        type: DataTypes.DECIMAL,
    },
    strike_price: {
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
    },
    calories: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    grams: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    proteins: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    fats: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    }
});

Menu_item.sync();

export default Menu_item;
