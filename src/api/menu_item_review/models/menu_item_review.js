
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Menu_item_review = sequelize.define("Menu_item_review", {
    image: {
        type: DataTypes.STRING,
    },
    rating: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    content: {
        type: DataTypes.TEXT,
    }
});

Menu_item_review.sync();

export default Menu_item_review;
