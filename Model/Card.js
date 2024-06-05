import db from "../DB/db.js"
import { DataTypes } from "sequelize";

const CardModel = db.define('tarjeta', {
    id_tarjeta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiracion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { tableName: 'tarjeta',timestamps: false });

export default CardModel;
