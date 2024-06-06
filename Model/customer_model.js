import db from "../DB/db.js"
import { DataTypes } from "sequelize";

const CustomerModel = db.define('cliente', {
    id_cliente : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nit: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, { tableName: 'cliente', timestamps: false });

export default CustomerModel;
