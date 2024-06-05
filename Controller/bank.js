import bank_model from "../Model/bank.js";

// Obtener todos los bancos
export const get_all = async (req, res) => {
    try {
        const banks = await bank_model.findAll();
        res.status(200).json(banks);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Buscar un banco por ID
export const find_one = async (req, res) => {
    try {
        const bank = await bank_model.findOne({
            where: { id_banco: req.params.id }
        });
        if (!bank) {
            return res.status(404).json({ message: "Banco no encontrado" });
        }
        res.status(200).json(bank);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Crear Banco
export const createbank = async (req, res) => {
    try {
        const existingBank = await bank_model.findOne({
            where: { nombre: req.body.nombre }
        });
        if (existingBank) {
            return res.json({ message: "El Banco no se puede repetir" });
        }
        const new_bank = await bank_model.create(req.body);
        res.status(200).json({
            "message": "El banco se ha creado Correctamente",
            "bank": new_bank
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Actualizar Banco
export const updatebank = async (req, res) => {
    try {
        const bank = await bank_model.findOne({
            where: { id_banco: req.params.id }
        });
        if (!bank) {
            return res.status(404).json({ message: "Banco no encontrado" });
        }
        await bank_model.update(req.body, {
            where: { id_banco: req.params.id }
        });
        const updatedBank = await bank_model.findOne({ where: { id_banco: req.params.id } });
        res.json({
            "message": "Actualizacion Exitosa",
            "Banco Actualizado": updatedBank
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
