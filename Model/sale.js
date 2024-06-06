import db from "../DB/db.js"

import { DataTypes } from "sequelize";

const sale_model = db.define('venta', {
    id_venta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fecha: { 
        type: DataTypes.DATE 
    },
    total: { 
        type: DataTypes.DECIMAL 
    },
    estado: { 
        type: DataTypes.STRING 
    }
}, { table_name: 'venta',
     timestamps: false 
 });


export default sale_model