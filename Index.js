import express from 'express';
import cors from 'cors';
import db from './DB/db.js';
import route_service from './Routes/Service.js';
import route_type_pay from './Routes/type_pay.js';
import route_card from './Routes/Card.js';
import route_customer from './Routes/Customer.js';
import route_bank from './Routes/bank.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/service/', route_service);
app.use('/typePay/', route_type_pay);
app.use('/card/', route_card);
app.use('/customer/', route_customer);
app.use('/bank/', route_bank);

const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Conexion exitosa a la DB');
        
        app.listen(4585, () => {
            console.log('Server UP running in http://localhost:4585/');
        });
    } catch (error) {
        console.log('Error de conexion a la DB:', error.message);
    }
};

startServer();

  