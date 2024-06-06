// payment.js
import { DataTypes } from 'sequelize';
import db from '../DB/db.js';
import bank_model from './bank_model.js';
import sale_model from './sale.js';
import card_model from './card_model.js';

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
}, {
    tableName: 'pagos',
    timestamps: false
});

// Definición de relaciones
payment_model.belongsTo(bank_model, { foreignKey: 'id_banco' });
payment_model.belongsTo(sale_model, { foreignKey: 'id_venta' });
payment_model.belongsTo(card_model, { foreignKey: 'id_tarjeta' });

export default payment_model;