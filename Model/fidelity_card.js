import db from "../DB/db.js"

import { DataTypes } from "sequelize";

const fidelity_card_model = db.define('tarjeta_fidelidad', {
    id_tarjetafidelidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero: { 
        type: DataTypes.STRING 
    },
    expiracion: { 
        type: DataTypes.DATE
    },
    puntos: { 
        type: DataTypes.INTEGER
    },
    id_cliente: { 
        type: DataTypes.INTEGER
    }
}, { table_name: 'tarjeta_fidelidad',
     timestamps: false 
 });


export default fidelity_card_model