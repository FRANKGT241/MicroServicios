import express from 'express';
import { get_all_cards, find_card_by_id, create_card, update_card } from '../Controller/Card';

const route_card = express.Router();

route_card.get('/cards', get_all_cards);
route_card.get('/:id', find_card_by_id);
route_card.post('/', create_card);
route_card.put('/:id', update_card);

export default route_card;
