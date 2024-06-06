import db from "../DB/db.js"

import { DataTypes } from "sequelize";

const log_fidelity_points_model = db.define('log_puntos_fidelidad', {
    id_log_puntos_fidelidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    puntos: { 
        type: DataTypes.INTEGER 
    },
    descripcion: { 
        type: DataTypes.STRING
    },
    servicio: { 
        type: DataTypes.STRING
    },
    fecha: { 
        type: DataTypes.DATE
    },
    id_tarjetafidelidad: { 
        type: DataTypes.INTEGER
    }
}, { table_name: 'log_puntos_fidelidad',
     timestamps: false 
 });


export default log_fidelity_points_model