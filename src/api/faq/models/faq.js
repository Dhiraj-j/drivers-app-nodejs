
import { DataTypes } from 'sequelize';
import sequelize from '../../../../database/index.js';

const Faq = sequelize.define("Faq", {
    question: {
        type: DataTypes.TEXT,
    },
    answer: {
        type: DataTypes.TEXT,
    }
});

Faq.sync();

export default Faq;
