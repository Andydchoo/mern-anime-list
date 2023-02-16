import express from 'express';
import mongoose from 'mongoose';
import listRouter from './routes/list-routes';
import router from './routes/user-routes';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/list", listRouter);

const URI = process.env.MONGO_URI;

mongoose
  .connect(
    URI
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to DB. Listening to localhost 5000"))
  .catch((err) => console.log(err));

