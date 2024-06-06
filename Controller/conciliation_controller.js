// /mnt/data/conciliation_controller.js
import axios from 'axios';
import payment_model from "../Model/payment.js";
import bank_model from "../Model/bank_model.js";
import sale_model from "../Model/sale.js"; // Importa el modelo de ventas
import { Sequelize } from 'sequelize';
import moment from 'moment';

export const conciliatePayments = async (req, res) => {
    try {
        const { start_date, end_date } = req.body;

        // Parseando las fechas en el formato adecuado
        const startDate = moment(start_date, "DD-MM-YY").format("YYYY-MM-DD");
        const endDate = moment(end_date, "DD-MM-YY").format("YYYY-MM-DD");

        const payments = await payment_model.findAll({
            include: [
                {
                    model: bank_model,
                    attributes: ['nombre'],
                    required: false
                },
                {
                    model: sale_model,
                    attributes: ['fecha'],
                    required: true,
                    where: {
                        fecha: {
                            [Sequelize.Op.between]: [startDate, endDate]
                        }
                    }
                }
            ]
        });

        const banks = {};
        payments.forEach(payment => {
            const bankName = payment.banco ? payment.banco.nombre : 'Unknown';
            if (!banks[bankName]) {
                banks[bankName] = {
                    total_transactions: 0,
                    total_credit_card: 0,
                    total_debit_card: 0,
                    total_cash: 0,
                    total_transfer: 0
                };
            }
            banks[bankName].total_transactions += 1;

            const paymentType = determinePaymentType(payment);

            if (paymentType === 'credito') {
                banks[bankName].total_credit_card += parseFloat(payment.monto);
            } else if (paymentType === 'debito') {
                banks[bankName].total_debit_card += parseFloat(payment.monto);
            } else if (paymentType === 'efectivo') {
                banks[bankName].total_cash += parseFloat(payment.monto);
            } else if (paymentType === 'transferencia') {
                banks[bankName].total_transfer += parseFloat(payment.monto);
            }
        });

        const workspace = Object.keys(banks).map(bankName => ({
            name: bankName,
            ...banks[bankName]
        }));

        const response = {
            close_date: "2120-23-12",
            amount: payments.reduce((sum, payment) => sum + parseFloat(payment.monto), 0),
            workspace: [
                {
                    id: 1,
                    banks: workspace
                }
            ]
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function determinePaymentType(payment) {

    return 'credito';
}
