import Bank from "../Model/bank_model.js";
import Payment from "../Model/payment.js";
import Customer from "../Model/customer_model.js";
import Card from "../Model/card_model.js";
import Service from "../Model/service_model.js";

export const savePayments = async (req, res) => {
    const paymentsData = req.body;

    try {
        for (const paymentData of paymentsData) {

            // Insertar o actualizar el servicio
            const [service, createdService] = await Service.findOrCreate({
                where: { nombre: paymentData.servicio },
                defaults: {
                    descripcion: 'Descripción del servicio'  
                }
            });

            for (const pago of paymentData.pagos) {
                let bank = null;
                if (pago.banco !== 'null') {
                    // Insertar o actualizar el banco
                    [bank] = await Bank.findOrCreate({
                        where: { nombre: pago.banco },
                        defaults: {
                            descripcion: pago.descripcion || '',  
                            contacto: pago.contacto || ''  
                        }
                    });
                }

                // Insertar o actualizar el cliente
                const [customer] = await Customer.findOrCreate({
                    where: { nit: pago.nit_cliente || 'CF' },
                    defaults: {
                        nombre: pago.nombre_cliente
                    }
                });

                let card = null;
                if (pago.numero_tarjeta) {
                    // Insertar o actualizar la tarjeta
                    [card] = await Card.findOrCreate({
                        where: { numero: pago.numero_tarjeta },
                        defaults: {
                            tipo: pago.tipo_pago.includes('credito') ? 'credito' : 'debito',
                            expiracion: pago.expiracion || '12/25',  
                            cvv: pago.cvv || 123  
                        }
                    });
                }

                // Insertar el pago
                await Payment.create({
                    tipo: pago.tipo_pago,
                    monto: pago.monto,
                    id_servicio: service.id_servicio,
                    id_banco: bank ? bank.id_banco : null,
                    id_tarjeta: card ? card.id_tarjeta : null,
                    id_cliente: customer.id_cliente
                });
            }
        }

        res.status(200).json({ respuesta: "ok", correlativo: "banrural-0001" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: "error", correlativo: null });
    }
};
