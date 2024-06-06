import sale_model from "../Model/sale.js"
import customer_model from "../Model/customer_model.js"
import payment_model from "../Model/payment.js"


import card_model from "../Model/card_model.js"
import fidelity_card_model from "../Model/fidelity_card.js"
import trasaction_model from "../Model/trasaction.js"
import bank_model from "../Model/bank_model.js"

// // GET
// export const get_all_cards = async (req, res) => {
//     try {
//         const cards = await Card.findAll();
//         res.status(200).json(cards);
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }

// GET
export const getPrueba = async (req, res) => {
    try {
        res.status(200).json({
            msg: 'hola'
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// // GET ID
// export const find_card_by_id = async (req, res) => {
//     try {
//         const card = await Card.findByPk(req.params.id_tarjeta);
//         if (!card) {
//             return res.status(404).json({ message: "Tarjeta no encontrada" });
//         }
//         res.json(card);
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }

// Post Liberar bomba gasolina
export const release_bomb = async (req, res) => {
    try {
        let current_date = new Date();
        current_date.setDate(current_date.getDate() - 1);
        const postPay = await sale_model.create({
            fecha: current_date,
            total: req.body.total,
            estado: 'pendiente',
            id_customere: null,
            id_servicio: 3
        });
        // console.log(postPay)
        res.status(201).json({ 
            respuesta: "ok", 
            id_venta: postPay.dataValues.id_venta 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const complete_payment = async (req, res) => {
    try {
        const sales_saved = await sale_model.findByPk(req.body.id_venta)
        if (!sales_saved) {
            return res.status(404).json({ message: "Venta inexistente" })
        }

        const data_customer = req.body.pagos[0]
        if(data_customer.nombre_cliente!="CF")
        {
            let customer = await customer_model.findOne({
                nit: data_customer.nit_customere
            })
            if (!customer) {
                customer = await sale_model.create({
                    nombre: data_customer.nombre_customere,
                    nit: data_customer.nit_customere
                })
                customer = customer.dataValues
                console.log("Cliente registrado " + customer)
            } 
    
            const sale_update = await sale_model.update(
                {
                    id_cliente: customer.id_cliente,
                    estado: "completado"
                },
                {
                    where:{
                            id_venta: customer.id_cliente
                        }
                }
            )
        }

        const data = req.body
        
        for (const item of data) {
            for (const pago of item.pagos) {
                const tipo_pago = pago.tipo_pago;
                const banco = pago.banco;
                const monto = pago.monto;
                const numero_tarjeta = pago.numero_tarjeta;
                let id_temp_card = null
                let id_temp_transaction = null
                let id_temp_fidelity = null
                let id_temp_bank = null
                
                if (tipo_pago.includes("debito") || tipo_pago.includes("credito")){
                    id_temp_card = await card_model.findOne({
                        numero: numero_tarjeta
                    })
                    if(!id_temp_card){
                        let cardCreate = card_model.create({
                            tipo: tipo_pago,
                            numero: numero_tarjeta
                        })
                        id_temp_card = id_temp_card.dataValues
                    }
                }
                else if (tipo_pago.includes("transaccion")){
                    id_temp_transaction = await trasaction_model.create({
                        correlativo:"prueba-001"
                    })
                    id_temp_transaction=id_temp_transaction.dataValues
                }
                else if (tipo_pago.includes("fidelidad") && data_customer.nit_cliente!=null){
                    id_temp_fidelity = await card_model.findOne({
                        numero: numero_tarjeta
                    })
                    if(!id_temp_fidelity){
                        let cardCreate = fidelity_card_model.create({
                            numero: numero_tarjeta
                        })
                        id_temp_fidelity = id_temp_fidelity.dataValues
                    }
                }

                if(banco){
                    id_temp_bank = await bank_model.findOne({
                        where: {
                            numero: { [Sequelize.Op.like]: '%banrural%' }
                        }
                    })
                }

                try {
                    await payment_model.create({
                        monto: monto,
                        id_banco: id_temp_bank,
                        id_tarjeta: id_temp_card,
                        id_venta: req.body.id_venta,
                        id_tarjetafidelidad: id_temp_fidelity, 
                        id_transacciones: id_temp_transaction
                    });
                } catch (error) {
                    console.error("Error registrar pago:", error);
                }
            }
        }
        
        console.log(postPay)
        res.status(201).json({ 
            respuesta: "ok", 
            id_venta: postPay.dataValues.id_venta 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// // PUT
// export const update_card = async (req, res) => {
//     try {
//         const card = await Card.findByPk(req.params.id_tarjeta);
//         if (!card) {
//             return res.status(404).json({ message: "Tarjeta no encontrada" });
//         }
//         const updatedCard = await card.update(req.body);
//         res.json({ message: "Tarjeta actualizada correctamente", card: updatedCard });
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }
