import sale_model from "../Model/sale.js";
import customer_model from "../Model/customer_model.js";
import payment_model from "../Model/payment.js";
import card_model from "../Model/card_model.js";
import fidelity_card_model from "../Model/fidelity_card.js";
import transaction_model from "../Model/trasaction.js";
import bank_model from "../Model/bank_model.js";

import { get_correlative } from '../Controller/correlative_controller.js';
import { Sequelize } from 'sequelize';

//Post Completar pago 
export const realese_pay = async (req, res) => {
    try {
        const pagos = req.body.pagos;

        // Verifica que 'pagos' exista y tenga al menos un elemento
        if (!pagos || pagos.length === 0) {
            return res.status(400).json({ message: "No se proporcionaron pagos" });
        }

        let customer = null;

        for (const pago of pagos) {
            if (pago.nombre_cliente !== "CF") {
                if (!pago.nit_cliente) {
                    return res.status(400).json({ message: "NIT del cliente no proporcionado" });
                }

                customer = await customer_model.findOne({
                    where: { nit: pago.nit_cliente }
                });

                if (!customer) {
                    customer = await customer_model.create({
                        nombre: pago.nombre_cliente,
                        nit: pago.nit_cliente
                    });
                    customer = customer.dataValues;
                } else {
                    customer = customer.dataValues;
                }
            }
        }

        // Suma los montos de los pagos
        const total = pagos.reduce((sum, pago) => sum + pago.monto, 0);

        // Verifica que el cliente esté definido antes de proceder con la creación de la venta
        if (customer) {
            let current_date = new Date();
            current_date.setDate(current_date.getDate() - 1);
            const pre_pay = await sale_model.create({
                fecha: current_date,
                total: total,
                estado: 'completo',
                id_cliente: customer.id_cliente,
                id_servicio: 3
            });

            let correlativeFun = null;

            for (const pago of pagos) {
                const tipo_pago = pago.tipo_pago.toLowerCase();
                const banco = pago.banco.toLowerCase();
                const monto = pago.monto;
                const numero_tarjeta = pago.numero_tarjeta;

                let id_temp_card = null;
                let id_temp_transaction = null;
                let id_temp_fidelity = null;
                let id_temp_bank = null;

                if (tipo_pago.includes("debito") || tipo_pago.includes("credito")) {
                    let card = await card_model.findOne({
                        where: { numero: numero_tarjeta }
                    });
                    if (!card) {
                        card = await card_model.create({
                            tipo: tipo_pago,
                            numero: numero_tarjeta
                        });
                    }
                    id_temp_card = card.dataValues.id_tarjeta;
                } else if (tipo_pago.includes("transaccion")) {
                    const correlativeAux = await get_correlative(banco);
                    correlativeFun = banco + '-' + '00' + correlativeAux.total_registros;
                    let transaction = await transaction_model.create({
                        correlativo: correlativeFun
                    });
                    id_temp_transaction = transaction.dataValues.id_transacciones;
                } else if (tipo_pago.includes("fidelidad") && pago.nit_cliente) {
                    let fidelityCard = await fidelity_card_model.findOne({
                        where: { numero: numero_tarjeta }
                    });
                    if (!fidelityCard) {
                        fidelityCard = await fidelity_card_model.create({
                            numero: numero_tarjeta
                        });
                    }
                    id_temp_fidelity = fidelityCard.dataValues.id_tarjetafidelidad;
                }

                if (banco) {
                    let bank = await bank_model.findOne({
                        where: { nombre: { [Sequelize.Op.like]: `%${banco}%` } }
                    });
                    id_temp_bank = bank ? bank.dataValues.id_banco : null;
                }

                try {
                    await payment_model.create({
                        monto: monto,
                        id_banco: id_temp_bank,
                        id_tarjeta: id_temp_card,
                        id_venta: pre_pay.dataValues.id_venta,
                        id_tarjetafidelidad: id_temp_fidelity,
                        id_transacciones: id_temp_transaction
                    });
                } catch (error) {
                    console.error("Error registrar pago:", error);
                }
            }

            res.status(201).json({
                respuesta: "ok",
                estado_pago: "completado",
                corelativo: correlativeFun
            });
        } else {
            res.status(400).json({
                message: "El cliente no se pudo encontrar o crear"
            });
        }
    } catch (error) {
        res.status(500).json({
            respuesta: error.message,
            estado_pago: "pendiente",
            corelativo: null
        });
    }
}
