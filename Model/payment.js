import db from "../DB/db.js"

import { DataTypes } from "sequelize";

const payment_model = db.define('pagos', {
    id_pago: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    monto: { 
        type: DataTypes.DECIMAL 
    },
    id_banco: { 
        type: DataTypes.INTEGER ,
        allowNull: true
    },
    id_tarjeta: { 
        type: DataTypes.INTEGER ,
        allowNull: true
    },
    id_venta: { 
        type: DataTypes.INTEGER
    },
    id_tarjetafidelidad: { 
        type: DataTypes.INTEGER ,
        allowNull: true
    },
    id_transacciones: { 
        type: DataTypes.INTEGER ,
        allowNull: true
    }
}, { table_name: 'pagos',
     timestamps: false 
 });


export default payment_model