// /mnt/data/payment.js
import db from "../DB/db.js";
import { DataTypes } from "sequelize";
import BankModel from "./bank_model.js";
import SaleModel from "./sale.js"; // Importa el modelo de ventas

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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_tarjeta: { 
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_venta: { 
        type: DataTypes.INTEGER
    },
    id_tarjetafidelidad: { 
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_transacciones: { 
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, { tableName: 'pagos', timestamps: false });

payment_model.belongsTo(BankModel, { foreignKey: 'id_banco', targetKey: 'id_banco' });
payment_model.belongsTo(SaleModel, { foreignKey: 'id_venta', targetKey: 'id_venta' }); // Define la asociación con ventas

export default payment_model;
