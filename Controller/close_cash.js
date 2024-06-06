import axios from 'axios';
import payment_model from "../Model/payment.js";
import sale_model from "../Model/sale.js";
import { Sequelize } from 'sequelize';
import moment from 'moment';

const closeCash = async () => {
    try {
        const today = moment().format("YYYY-MM-DD");

        const payments = await payment_model.findAll({
            include: [
                {
                    model: sale_model,
                    attributes: ['fecha'],
                    required: true,
                    where: {
                        fecha: {
                            [Sequelize.Op.eq]: today
                        }
                    }
                }
            ]
        });

        let amount = 0;
        let total_transactions = 0;
        let total_credit_card = 0;
        let total_debit_card = 0;

        payments.forEach(payment => {
            amount += parseFloat(payment.monto);
            total_transactions += 1;
            const paymentType = determinePaymentType(payment);

            if (paymentType === 'credito') {
                total_credit_card += parseFloat(payment.monto);
            } else if (paymentType === 'debito') {
                total_debit_card += parseFloat(payment.monto);
            }
        });

        const total_cash = amount + total_transactions + total_credit_card + total_debit_card;

        const data = {
            transaction_type: "Ingreso",
            close_date: today,
            time_date: "23:59",
            amount: amount,
            total_transactions: total_transactions,
            total_credit_card: total_credit_card,
            total_debit_card: total_debit_card,
            total_cash: total_cash
        };

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'token',
        };
        const response = await axios.post('https://api a consumir/endpoint', data, { headers });

        console.log('Cierre de caja enviado:', response.data);
    } catch (error) {
        console.error('Error en el cierre de caja:', error.message);
    }
};

function determinePaymentType(payment) {
    return 'credito';
}

export default closeCash;
