
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Store_review = sequelize.define("Store_review", {
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

Store_review.sync();

export default Store_review;
