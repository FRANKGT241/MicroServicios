import bank_model from "../Model/bank_model.js";
import { Sequelize } from 'sequelize';

// Función para obtener el banco por nombre y contar los registros
const get_correlative = async (bankName) => {
    try {
        const bank = await bank_model.findOne({
            where: { nombre: { [Sequelize.Op.like]: `%${bankName}%` } }
        });

        if (!bank) {
            return null;
        }

        const countQuery = `
            SELECT COUNT(*) as total_registros
            FROM pagos
            INNER JOIN banco ON banco.id_banco = pagos.id_banco
            INNER JOIN transaccion ON transaccion.id_transacciones = pagos.id_transacciones
            WHERE banco.nombre LIKE :bankName AND pagos.id_transacciones IS NOT NULL;
        `;
        
        const [result] = await bank_model.sequelize.query(countQuery, {
            replacements: { bankName: `%${bankName}%` },
            type: Sequelize.QueryTypes.SELECT
        });

        const totalRegistros = result.total_registros + 1;

        return {
            total_registros: totalRegistros
        };
    } catch (error) {
        throw new Error('Error al buscar el banco y contar los registros: ' + error.message);
    }
};

export const get = async (req, res) => {
    try {
        let bank="banrural"
        const resp = await get_correlative(bank);
        res.status(200).json({
            msg: bank+'-'+'00'+resp.total_registros
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};
