import sale_model from "../Model/sale.js";
import CustomerModel from "../Model/customer_model.js";

export const realese_pay = async (req, res) => {
    try {
        const data = req.body;

        for (const item of data) {
            const { fecha, estado_pago, pagos } = item;

            for (const pago of pagos) {
                const { tipo_pago, banco, monto, numero_tarjeta, nombre_cliente, nit_cliente } = pago;
                if(!nit_cliente==null) {
                    const clienteExistente = await CustomerModel.findOne({ where: { nit: nit_cliente } });
                    if (!clienteExistente) {
                        const nuevoCliente = await CustomerModel.create({
                            nombre: nombre_cliente,
                            nit: nit_cliente
                        });
                       
                    }else{
                        console.log("este ya existe")
                    }
                }



                console.log(`Fecha: ${fecha}`);
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

        res.status(201).json({ 
            respuesta: "ok"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
