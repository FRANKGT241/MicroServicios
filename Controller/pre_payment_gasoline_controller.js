import sale_model from "../Model/sale.js";

export const realese_pay = async (req, res) => {
    try {
        const data = req.body

            
        data.forEach(item => {
            const fecha = item.fecha;
            const estado_pago = item.estado_pago;

            item.pagos.forEach(pago => {
                const tipo_pago = pago.tipo_pago;
                const banco = pago.banco;
                const monto = pago.monto;
                const numero_tarjeta = pago.numero_tarjeta;
                const nombre_cliente = pago.nombre_cliente;
                const nit_cliente = pago.nit_cliente;

                console.log(fecha);
                console.log(estado_pago);
                console.log(tipo_pago);
                console.log(banco);
                console.log(monto);
                console.log(numero_tarjeta);
                console.log(nombre_cliente);
                console.log(nit_cliente);
                console.log('\n'); 
            });
        });
        res.status(201).json({ 
            respuesta: "ok"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}