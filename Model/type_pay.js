import db from "../DB/database.js"

import { DataTypes } from "sequelize";

const type_pay_model = db.define('tipo_pago', {
    id_tipo_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: { 
        type: DataTypes.STRING 
    },
    tipo: { 
        type: DataTypes.STRING 
    }
}, { table_name: 'tipo_pago' });


export default type_pay_model