
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Cart = sequelize.define("Cart", {
    total_price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
    }
});

Cart.sync();

export default Cart;
