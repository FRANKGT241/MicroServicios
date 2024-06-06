// Controller/conciliation_controller.js

import db from '../DB/db.js';

const getPaymentsByDateRange = async (startDate, endDate) => {
  const query = `
    SELECT 
      p.id_pago, p.monto, b.nombre AS bank_name, t.tipo AS card_type, p.id_tarjeta
    FROM 
      pagos p
      JOIN banco b ON p.id_banco = b.id_banco
      JOIN tarjeta t ON p.id_tarjeta = t.id_tarjeta
    WHERE 
      p.fecha BETWEEN :startDate AND :endDate;
  `;
  const [results] = await db.query(query, { replacements: { startDate, endDate } });
  return results;
};

export const conciliatePayments = async (req, res) => {
  const { start_date, end_date } = req.body;

  try {
    const payments = await getPaymentsByDateRange(start_date, end_date);
    const banks = {};

    payments.forEach(payment => {
      if (!banks[payment.bank_name]) {
        banks[payment.bank_name] = {
          total_transactions: 0,
          total_credit_card: 0,
          total_debit_card: 0,
          total_cash: 0,
          total_transfer: 0,
        };
      }

      banks[payment.bank_name].total_transactions += 1;
      if (payment.card_type === 'Credito') {
        banks[payment.bank_name].total_credit_card += payment.monto;
      } else if (payment.card_type === 'Debito') {
        banks[payment.bank_name].total_debit_card += payment.monto;
      }
      // Aquí puedes añadir lógica para total_cash y total_transfer si se aplica
    });

    const workspace = [
      {
        id: 1,
        banks: Object.entries(banks).map(([name, totals]) => ({
          name,
          ...totals
        })),
      },
    ];

    const response = {
      close_date: "2120-23-12", // Este valor puede ser dinámico según sea necesario
      amount: payments.reduce((sum, payment) => sum + payment.monto, 0),
      workspace,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error realizando la conciliación' });
  }
};
