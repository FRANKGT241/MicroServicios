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
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    nit: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, { tableName: 'cliente' });

export default CustomerModel;
