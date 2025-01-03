"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || "todo", process.env.DB_USER || "postgres", process.env.DB_PASSWORD || "admin", {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
});
exports.default = sequelize;
