import { Sequelize } from "sequelize";
import dbConfig from "./db.config.js";
const sequelize = new Sequelize(dbConfig)
export default sequelize