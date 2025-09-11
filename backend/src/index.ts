import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './models';
import aiRoutes from './routes/ai';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/ai', aiRoutes);

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
