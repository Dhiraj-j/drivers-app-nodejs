
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Package = sequelize.define("Package", {
    sender_name: {
        type: DataTypes.STRING,
    },
    sender_mobile: {
        type: DataTypes.STRING,
    },
    sender_address: {
        type: DataTypes.STRING,
    },
    pickup_date: {
        type: DataTypes.DATEONLY,
    },
    pickup_time: {
        type: DataTypes.TIME,
    },
    receiver_name: {
        type: DataTypes.STRING,
    },
    receiver_mobile: {
        type: DataTypes.STRING,
    },
    receiver_address: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.TEXT,
    },
    package_image: {
        type: DataTypes.STRING,
    },
    package_type: {
        type: DataTypes.ENUM("SHATTER-RESISTANT", "EASILY-BREAKABLE"),
        defaultValue: "SHATTER-RESISTANT"
    },
    package_size: {
        type: DataTypes.ENUM("1KG", "1KG-5KG", "5KG-10KG"),
        defaultValue: "1KG-5KG"
    },
    shipping_method: {
        type: DataTypes.ENUM("SAME-DAY", "EXPRESS", "REGULAR"),
        defaultValue: "REGULAR"
    },
    delivery_charges: {
        type: DataTypes.DECIMAL
    }
});

Package.sync();

export default Package;
