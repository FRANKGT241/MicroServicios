import Sale from "../Model/sale.js";
import Payment from "../Model/payment.js";
import Service from "../Model/service_model.js";
import Bank from "../Model/bank_model.js";
import Customer from "../Model/customer_model.js";
import Card from "../Model/card_model.js";

export const savePayments = async (req, res) => {
    const requestData = req.body;

    try {
        const sale = await Sale.create({
            fecha: new Date(),
            total: 0,
            estado: 'Pendiente',
            id_cliente: null,
            id_servicio: null
        });

        const id_venta = sale.id_venta;

        for (const request of requestData) {
            for (const payment of request.pagos) {
                let service = await Service.findOrCreate({
                    where: { nombre: request.servicio },
                    defaults: {
                        descripcion: 'Descripción del servicio'  
                    }
                });

                let bank = null;
                if (payment.banco !== 'null') {
                    bank = await Bank.findOrCreate({
                        where: { nombre: payment.banco },
                        defaults: {
                            descripcion: '',  
                            contacto: ''  
                        }
                    });
                }

                const [customer] = await Customer.findOrCreate({
                    where: { nit: payment.nit_cliente },
                    defaults: {
                        nombre: payment.nombre_cliente
                    }
                });

                let card = null;
                if (payment.numero_tarjeta) {
                    card = await Card.findOrCreate({
                        where: { numero: payment.numero_tarjeta },
                        defaults: {
                            tipo: payment.tipo_pago.includes('credito') ? 'credito' : 'debito',
                            expiracion: payment.expiracion || '12/25',  
                            cvv: payment.cvv || 123  
                        }
                    });
                }

                await Payment.create({
                    tipo: payment.tipo_pago,
                    monto: payment.monto,
                    id_servicio: service[0].id_servicio,
                    id_banco: bank ? bank[0].id_banco : null,
                    id_tarjeta: card ? card[0].id_tarjeta : null,
                    id_cliente: customer.id_cliente,
                    id_venta: id_venta
                });
            }
        }

        res.status(200).json({ respuesta: "ok", correlativo: "banrural-0001" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ respuesta: "error", correlativo: null });
    }
};


