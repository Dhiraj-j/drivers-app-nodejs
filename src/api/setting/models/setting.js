
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Setting = sequelize.define("Setting", {
    password_length: {
        type: DataTypes.INTEGER,
    },
    currency: {
        type: DataTypes.STRING,
    },
    charges_per_kg: {
        type: DataTypes.DECIMAL,
    }
});

Setting.sync();

export default Setting;
