import bank_model from "../Model/bank.js";

//Obtener todo
export const get_all = async (req,res) => {
    try{
        const bank = await bank_model.findAll();
        res.status(200).json(bank)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// Buscar por ID
export const find_one = async (req,res) => {
    try {
        const [bank] = await bank_model.findAll({
            where: { id: req.params.id}
        });
        if(!bank)
            {
                return res.status(404).json({ message: "Banco no encontrado"})
            }
        res.status(200).json(bank)
    } catch (error) {
        res.json({message: error.message});
    }
}

//Crear Banco
export const createbank = async (req, res) => {
    try {
        const [bank] = await bank_model.findAll({
            where: { nombre: req.body.nombre}
        });
        if(bank)
            {
                return res.json({ message: "El Banco no se puede repetir"});
            }
            const new_bank = await bank_model.create(req.body);

            res.status(200).json({
                "message": "El banco se ha creado Correctamente",
                "bank": new_bank
            });
    } catch (error) {
        res.json({ message: error.message});
    }
}

// Actualizar Banco
export const updatebank = async (req, res) => {
    try {
        const [bank] = await bank_model.findAll({
            where: { id_banco: req.params.id }
        });
        if(!bank){
            return res.status(404).json({ message: "Banco no encontrado" });
        }
        const new_bank = await bank_model.update(req.body, {
            where: { id_banco: req.params.id }
        });

        res.json({
            "message": "Actualizacion Exitosa",
            "Banco Actualizado": new_bank
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}