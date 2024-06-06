import sale_model from "../Model/sale.js";
import customer_model from "../Model/customer_model.js";

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
        const sales_saved = await sale_model.findByPk(req.body.id_venta);
        if (!sales_saved) {
            return res.status(404).json({ message: "Venta inexistente" });
        }

        const data_customer = req.body.pagos[0]
        let customer = await customer_model.findOne({
            nit: data_customer.nit_customere
        })
        if (!customer) {
            customer = await sale_model.create({
                nombre: data_customer.nombre_customere,
                nit: data_customer.nit_customere
            });
            console.log("customere registrado " + customer.dataValues)
        } 

        const customer_update = await customer_model.update(req.body);

        let current_date = new Date();
        current_date.setDate(current_date.getDate() - 1);
        const postPay = await sale_model.create({
            fecha: current_date,
            total: req.body.total,
            estado: 'pendiente',
            id_customere: null,
            id_servicio: 3
        });
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
