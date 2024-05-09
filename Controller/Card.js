import Card from "../Model/Card";

// GET
export const get_all_cards = async (req, res) => {
    try {
        const cards = await Card.findAll();
        res.status(200).json(cards);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// GET ID
export const find_card_by_id = async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id_tarjeta);
        if (!card) {
            return res.status(404).json({ message: "Tarjeta no encontrada" });
        }
        res.json(card);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// POST
export const create_card = async (req, res) => {
    try {
        const cardExists = await Card.findOne({ where: { numero: req.body.numero } });
        if (cardExists) {
            return res.status(400).json({ message: "La tarjeta ya existe" });
        }
        const newCard = await Card.create(req.body);
        res.status(201).json({ message: "Tarjeta creada correctamente", card: newCard });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// PUT
export const update_card = async (req, res) => {
    try {
        const card = await Card.findByPk(req.params.id_tarjeta);
        if (!card) {
            return res.status(404).json({ message: "Tarjeta no encontrada" });
        }
        const updatedCard = await card.update(req.body);
        res.json({ message: "Tarjeta actualizada correctamente", card: updatedCard });
    } catch (error) {
        res.json({ message: error.message });
    }
}
