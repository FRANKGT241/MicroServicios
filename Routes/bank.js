import express from 'express';
import { get_all, find_one, createbank, updatebank } from '../Controller/bank.js';

const route_bank = express.Router();

route_bank.get('/', get_all);         // Ruta para obtener todos los bancos
route_bank.get('/:id', find_one);     // Ruta para obtener un banco por ID
route_bank.post('/', createbank);     // Ruta para crear un banco
route_bank.put('/:id', updatebank);   // Ruta para actualizar un banco

export default route_bank;
