
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Menu_category = sequelize.define("Menu_category",{
        
    name: {
        type: DataTypes.STRING,
    }
});

Menu_category.sync();

export default Menu_category;
          