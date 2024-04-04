
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Cart = sequelize.define("Cart", {

    name: {
        type: DataTypes.STRING,
    }
});

Cart.sync();

export default Cart;
