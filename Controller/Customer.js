import Customer from "../Model/Customer.js";

// GET
export const get_all_customers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// GET ID
export const find_customer_by_id = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id_cliente);
        if (!customer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(customer);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// POST
export const create_customer = async (req, res) => {
    try {
        const customerExists = await Customer.findOne({ where: { nit: req.body.nit } });
        if (customerExists) {
            return res.status(400).json({ message: "El cliente con este NIT ya existe" });
        }
        const newCustomer = await Customer.create(req.body);
        res.status(201).json({ message: "Cliente creado correctamente", customer: newCustomer });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// PUT
export const update_customer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id_cliente);
        if (!customer) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        const updatedCustomer = await customer.update(req.body);
        res.json({ message: "Cliente actualizado correctamente", customer: updatedCustomer });
    } catch (error) {
        res.json({ message: error.message });
    }
}
