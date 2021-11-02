import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import colors from 'colors';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(
	cors({
		origin: 'https://universityback-end.herokuapp.com/'
	})
);

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server is running in port ${PORT}`.cyan.bold.underline);
});
