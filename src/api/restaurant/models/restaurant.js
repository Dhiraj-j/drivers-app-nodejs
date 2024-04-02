
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Restaurant = sequelize.define("Restaurant",{
        
    name: {
        type: DataTypes.STRING,
    },
    latitude: {
        type: DataTypes.FLOAT,
    },
    latitude: {
        type: DataTypes.FLOAT,
    },
    image: {
        type: DataTypes.STRING,
    }
});

Restaurant.sync();

export default Restaurant;
          