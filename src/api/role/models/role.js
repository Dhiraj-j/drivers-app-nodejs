
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Role = sequelize.define("Role",{
        
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    }
});

Role.sync();

export default Role;
          