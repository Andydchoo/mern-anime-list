import express from 'express';
import mongoose from 'mongoose';
import listRouter from './routes/list-routes';
import router from './routes/user-routes';

const app = express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/list", listRouter);

mongoose
  .connect(
    'mongodb+srv://admin:admin@cluster0.dnlpx58.mongodb.net/mern-anime-list?retryWrites=true&w=majority'
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to DB. Listening to localhost 5000"))
  .catch((err) => console.log(err));

