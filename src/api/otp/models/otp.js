
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Otp = sequelize.define("Otp", {
    otp: {
        type: DataTypes.INTEGER,
    },
    expires: {
        type: DataTypes.DATE,
    }
});

Otp.sync();

export default Otp;
