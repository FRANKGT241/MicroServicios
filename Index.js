import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

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

  app.get('/', (req, res) => {
    res.send('Hola, este es tu mensaje desde el servidor!');
  });