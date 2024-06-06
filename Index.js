import express from 'express';
import cors from 'cors';
import db from './DB/db.js';
import gasoline_payment_route from './Routes/gasoline_payment_route.js';

const app = express();
app.use(cors());
app.use(express.json());

//Mendel












//Mario












//Ajpop y frank

app.use('service/gasoline', gasoline_payment_route);













/*
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
  */
  app.listen(4585, () => {
    console.log('Server UP running in http://localhost:4585/');
  });