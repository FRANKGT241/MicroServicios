import express from 'express';
import cors from 'cors';
import db from './DB/db.js';
import route_service from './Routes/Service.js';
import route_type_pay from './Routes/type_pay.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/service/', route_service);
app.use('/typePay/', route_type_pay);

const startServer = async () => {
    try {
      await db.authenticate();
      console.log('Conexion exitosa a la DB');
      
      app.listen(3000, () => {
        console.log('Server UP running in http://localhost:3000/');
      });
    } catch (error) {
      console.log('Error de conexion a la DB:', error.message);
    }
  };
  
  startServer();
  