import db from "../DB/db.js";

import { DataTypes } from "sequelize";

const bank_model = db.define('banco', {
    id_banco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    },
    contacto: {
        type: DataTypes.STRING
    },
    total_transferencias: {
        type: DataTypes.INTEGER
    }
}, { tableName: 'banco',timestamps: false });

export default bank_model;
