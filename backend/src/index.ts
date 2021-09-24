import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import Film from "./Film/FilmModel";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Film.collection.createIndex(
      { name: 1, director: 1, releaseDate: 1 },
      { unique: true }
    );
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
