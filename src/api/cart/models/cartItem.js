
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const CartItem = sequelize.define("CartItem", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

CartItem.sync();
export default CartItem;
