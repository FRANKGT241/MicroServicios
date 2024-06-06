import db from "../DB/db.js"

import { DataTypes } from "sequelize";

const trasaction_model = db.define('transaccion', {
    id_transacciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    correlativo: { 
        type: DataTypes.STRING 
    }
}, { table_name: 'transaccion',
     timestamps: false 
 });


export default trasaction_model