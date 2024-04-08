
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';
import { hash } from '../../../utils/bcrypt.js';

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM("MALE", "FEMALE", "TRANSGENDER", "NON-SPECIFIED"),
        defaultValue: "NON-SPECIFIED"
    },
    dob: {
        type: DataTypes.DATEONLY,
    },
    latitude: {
        type: DataTypes.FLOAT,
    },
    longitude: {
        type: DataTypes.FLOAT,
    },
    blocked: {
        type: DataTypes.BOOLEAN,
    },

    notification_token: {
        type: DataTypes.STRING,
    },
    block_note: {
        type: DataTypes.TEXT,
    },

    profile_image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    socket_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

User.beforeCreate(async (user, options) => {
    if (user.password && user.changed("password")) {
        const hashedPassword = await hash(user.password)
        user.password = hashedPassword
    }
})
User.beforeUpdate(async (user, options) => {
    if (user.password && user.changed("password")) {
        const hashedPassword = await hash(user.password)
        user.password = hashedPassword
    }
})

User.sync();

export default User;
