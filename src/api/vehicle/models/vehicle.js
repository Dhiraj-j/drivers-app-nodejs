
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Vehicle = sequelize.define("Vehicle", {

    name: {
        type: DataTypes.STRING,
    },
    model: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    number: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    }
});

Vehicle.sync();

export default Vehicle;
