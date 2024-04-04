
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Category = sequelize.define("Category",{
        
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT,
    }
});

Category.sync();

export default Category;
          