
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import scheduleRoutes from './routes/schedule.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome!');
});

app.use('/schedule', scheduleRoutes);

const CONNECTION_URL = 'mongodb://localhost:27017/isara_project';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);