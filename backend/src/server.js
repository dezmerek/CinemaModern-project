import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const dbConnectionString = process.env.DB_CONNECTION_STRING;

app.listen(3001, () => console.log('Server started'));