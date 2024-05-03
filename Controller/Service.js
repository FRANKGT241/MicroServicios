import Service from "../Model/Service.js";

export const get_all = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const find_one = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id_servicio);
        if(!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.json(service);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const create_service = async (req, res) => {
    try {
        const existingService = await Service.findOne({ where: { nombre: req.body.nombre } });
        if(existingService) {
            return res.json({ message: "Datos Duplicados: Ya existe un servicio con este nombre" });
        }
        await Service.create(req.body);
        res.json({ message: "Registro creado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const update_service = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id_servicio);
        if(!service) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        await service.update(req.body);
        res.json({ message: "Registro actualizado correctamente" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

