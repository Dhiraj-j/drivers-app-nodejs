
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Store_type = sequelize.define("Store_type", {

    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
});

Store_type.sync();

export default Store_type;
