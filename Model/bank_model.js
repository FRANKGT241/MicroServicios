import db from "../DB/db.js"
import { DataTypes } from "sequelize";

const BankModel = db.define('banco', {
    id_banco: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING },
    contacto: { type: DataTypes.STRING },
}, { table_name: 'banco', timestamps: false, freezeTableName:true });

export default BankModel;

