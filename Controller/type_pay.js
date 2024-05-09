import type_pay_model from "../Model/type_pay.js";

export const get_all = async (req, res) => {
    try {
        const type_pay = await type_pay_model.findAll()
        res.status(200).json(type_pay)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const find_one = async (req, res) => {
    try {
        const [type_pay] = await type_pay_model.findAll({
            where: { id_tipo_pago: req.params.id }
        });
        if(!type_pay)
        {
            return res.status(404).json({ message: "Paymment Type not found" })
        }
        res.status(200).json(type_pay)
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Create Client
export const create = async (req, res) => {
    try {
        const [type_pay] = await type_pay_model.findAll({
            where: { tipo: req.body.tipo }
        });
        if(type_pay)
        {
            return res.json({ message: "You can't repeat Paymment Type" });
        }
        const newTypePay = await type_pay_model.create(req.body);
        
        res.status(200).json({
            "message": "Successful registration",
            "type_registred": newTypePay
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

//update
export const update = async (req, res) => {
    try {
        const [type_pay] = await type_pay_model.findAll({
            where: { id_tipo_pago: req.params.id }
        });

        if(!type_pay)
        {
            return res.status(404).json({ message: "Paymment Type not found" });
        }
        
        await type_pay_model.update(req.body, {
            where: { id_tipo_pago: req.params.id }
        });

        const [newTypePay] = await type_pay_model.findAll({
            where: { id_tipo_pago: req.params.id }
        });
        
        res.json({
            "message": "Successful update",
            "Type Updated": newTypePay
        });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// export const deleteClient = async (req, res) => {
//     try {
//         const [client] = await ClientModel.findAll({
//             where: { idCliente: req.params.idCliente }
//         });
//         if(!client)
//         {
//             return res.status(404).json({ message: "Cliente no Registrado" });
//         }
//         await ClientModel.destroy({
//             where: {
//                 idCliente: req.params.idCliente
//             }
//         });
//         //--------------------- PARA LA AUDITORIA ----------------------------------------------------------------

//         await registerMovi(tableName, req.params.idCliente, 1, 3);

//         //----------------------- FIN ----------------------------------------------------------------------------------
//         res.json({
//             "message": "El registro se borró correctamente"
//         });
//     } catch (error) {
//         res.json({ message: error.message });
//     }
// }
