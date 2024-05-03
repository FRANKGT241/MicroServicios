import db from "../DB/database.js"

import { DataTypes } from "sequelize";

const ServiceModel = db.define('cliente', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nombre: { type: DataTypes.STRING },
    descripcion: { type: DataTypes.STRING }
}, { tableName: 'servicio' });


export default ServiceModel