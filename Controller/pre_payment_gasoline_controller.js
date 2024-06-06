import sale_model from "../Model/sale.js";
import CustomerModel from "../Model/customer_model.js";

export const realese_pay = async (req, res) => {
    try {
        const data = req.body;

        let totalMonto = 0;
        let estadoPagoVenta = null;
        let idClienteFinal = null;
        const fechaVenta = new Date(); // Utiliza la fecha y hora actual

        for (const item of data) {
            const { estado_pago, pagos } = item;

            // Guardar el estado de pago de la venta
            if (!estadoPagoVenta) {
                estadoPagoVenta = estado_pago;
            }

            for (const pago of pagos) {
                const { tipo_pago, banco, monto, numero_tarjeta, nombre_cliente, nit_cliente } = pago;

                // Creación de cliente
                if (nit_cliente) {
                    let clienteExistente = await CustomerModel.findOne({ where: { nit: nit_cliente } });
                    if (!clienteExistente) {
                        const nuevoCliente = await CustomerModel.create({
                            nombre: nombre_cliente,
                            nit: nit_cliente
                        });
                        clienteExistente = nuevoCliente;
                        idClienteFinal = clienteExistente.id_cliente;
                    } else {
                        console.log("Este cliente ya existe");
                    }
                    idClienteFinal = clienteExistente.id_cliente;
                }

                // Acumulación del monto
                totalMonto += monto;


                //Pagos



                console.log(`Estado de Pago: ${estado_pago}`);
                console.log(`Tipo de Pago: ${tipo_pago}`);
                console.log(`Banco: ${banco}`);
                console.log(`Monto: ${monto}`);
                console.log(`Número de Tarjeta: ${numero_tarjeta}`);
                console.log(`Nombre del Cliente: ${nombre_cliente}`);
                console.log(`NIT del Cliente: ${nit_cliente}`);
                console.log('\n');
            }
        }
        if (idClienteFinal) {
            await sale_model.create({
                fecha: fechaVenta,
                total: totalMonto,
                estado: estadoPagoVenta,
                id_cliente: idClienteFinal,
                id_servicio: 3
            });
        } else {
            await sale_model.create({
                fecha: fechaVenta,
                total: totalMonto,
                estado: estadoPagoVenta,
                id_cliente: null,
                id_servicio: 3
            });
        }

       


        res.status(201).json({
            respuesta: "ok"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
