
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Package_category = sequelize.define("Package_category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    }
});
Package_category.sync();

export default Package_category;
