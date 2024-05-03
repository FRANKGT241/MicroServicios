import express from 'express';
import cors from 'cors';
import db from './DB/db.js';


const app = express();
app.use(cors());
app.use(express.json());


//app.use('/NombredeApi/', routerCliente);

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
  