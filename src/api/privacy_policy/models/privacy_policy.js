
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Privacy_policy = sequelize.define("Privacy_policy", {
    title: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    }
});

Privacy_policy.sync();

export default Privacy_policy;
