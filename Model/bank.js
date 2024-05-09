import db from "../DB/database.js"

import { DataTypes } from "sequelize";

const bank_model = db.define('banco',{
    id_banco:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type:DataTypes.STRING
    },
    descripcion:{
        type: DataTypes.STRING
    },
    contacto: {
        type: DataTypes.STRING
    },
    total_transferencias:{
        type: DataTypes.INTEGER
    }
},{ table_name: 'banco' });

export default bank_model