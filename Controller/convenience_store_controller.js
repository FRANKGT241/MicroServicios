import sale_model from "../Model/sale.js";
import customer_model from "../Model/customer_model.js";
import payment_model from "../Model/payment.js";
import card_model from "../Model/card_model.js";
import fidelity_card_model from "../Model/fidelity_card.js";
import trasaction_model from "../Model/trasaction.js"
import bank_model from "../Model/bank_model.js";
import { get_correlative } from '../Controller/correlative_controller.js';
import { Sequelize } from 'sequelize';

// Post  tienda de conveniencia
export const save_convenience_store = async (req, res) => {
    try {
        const { fecha, servicio, pagos } = req.body[0]; 

        // Process sale
        const sale_date = new Date(fecha);
        const sale = await sale_model.create({
            fecha: sale_date,
            total: pagos.reduce((acc, pago) => acc + pago.monto, 0),
            estado: 'pendiente',
            id_cliente: null,
            id_servicio: 1 // Assuming 4 is the id for convenience store service
        });

        let correlativeFun = null;
        let correlativeAux = null;

        for (const pago of pagos) {
            const { tipo_pago, banco, monto, numero_tarjeta, nombre_cliente, nit_cliente } = pago;
            let id_temp_card = null;
            let id_temp_transaction = null;
            let id_temp_fidelity = null;
            let id_temp_bank = null;

            if (nombre_cliente !== "CF" && !nit_cliente) {
                return res.status(400).json([{ respuesta: "error", correlativo: null, mensaje: "NIT del cliente no proporcionado" }]);
            }

            if (nombre_cliente !== "CF") {
                let customer = await customer_model.findOne({ where: { nit: nit_cliente } });
                if (!customer) {
                    customer = await customer_model.create({ nombre: nombre_cliente, nit: nit_cliente });
                }
                await sale.update({ id_cliente: customer.id_cliente, estado: "completado" });
            }

            if (tipo_pago.includes("debito") || tipo_pago.includes("credito")) {
                let card = await card_model.findOne({ where: { numero: numero_tarjeta } });
                if (!card) {
                    card = await card_model.create({ tipo: tipo_pago, numero: numero_tarjeta });
                }
                id_temp_card = card.dataValues.id_tarjeta;
            } else if (tipo_pago.includes("transaccion")) {
                correlativeAux = await get_correlative(banco);
                correlativeFun = banco + '-00' + correlativeAux.total_registros;
                let transaction = await trasaction_model.create({ correlativo: correlativeFun });
                id_temp_transaction = transaction.dataValues.id_transacciones;
            } else if (tipo_pago.includes("fidelidad") && nit_cliente) {
                let fidelityCard = await fidelity_card_model.findOne({ where: { numero: numero_tarjeta } });
                if (!fidelityCard) {
                    fidelityCard = await fidelity_card_model.create({ numero: numero_tarjeta });
                }
                id_temp_fidelity = fidelityCard.dataValues.id_tarjetafidelidad;
            }

            if (banco) {
                let bank = await bank_model.findOne({ where: { nombre: { [Sequelize.Op.like]: '%' + banco + '%' } } });
                id_temp_bank = bank ? bank.dataValues.id_banco : null;
            }

            try {
                await payment_model.create({
                    monto: monto,
                    id_banco: id_temp_bank,
                    id_tarjeta: id_temp_card,
                    id_venta: sale.dataValues.id_venta,
                    id_tarjetafidelidad: id_temp_fidelity,
                    id_transacciones: id_temp_transaction
                });
            } catch (error) {
                console.error("Error registrar pago:", error);
            }
        }

        res.status(201).json([{ respuesta: "ok", correlativo: correlativeFun }]);
    } catch (error) {
        res.status(500).json([{ respuesta: "error", correlativo: null, mensaje: error.message }]);
    }
};



