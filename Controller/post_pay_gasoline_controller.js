import saleModel from "../Model/sale.js";

// // GET
// export const get_all_cards = async (req, res) => {
//     try {
//         const cards = await Card.findAll();
//         res.status(200).json(cards);
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }

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
        const postPay = await saleModel.create({
            fecha: req.body.fecha,
            total: req.body.total,
            estado_pago: 'pendiente',
            id_cliente: null,
            id_servicio: 3
        });
        res.status(201).json({ 
            respuesta: "ok", 
            id_venta: postPay.id 
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
