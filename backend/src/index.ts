import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import { FilmsMongoCollection } from "./Film/FilmModel";
import { WorkersMongoCollection } from "./Workers/WorkersModel";
import { FilmsCrewMongoCollection } from "./FilmsCrew/FilmsCrewModel";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/imdb2-0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await FilmsMongoCollection.collection.createIndex(
      { filmId: 1 },
      { unique: true }
    );

    await WorkersMongoCollection.collection.createIndex(
      { workerId: 1 },
      { unique: true }
    );

    await FilmsCrewMongoCollection.collection.createIndex(
      { filmId: 1, workerId: 1, category: 1, characters: 1 },
      { unique: true }
    );

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
