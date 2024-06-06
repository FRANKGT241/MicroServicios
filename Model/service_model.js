import db from "../DB/db.js"
import { DataTypes } from "sequelize";

const ServiceModel = db.define('servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING }
}, { tableName: 'servicio', timestamps: false });

export default ServiceModel;
