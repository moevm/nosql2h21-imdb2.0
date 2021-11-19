import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import { FilmsMongoCollection } from "./Film/FilmModel";
import { WorkersMongoCollection } from "./Workers/WorkersModel";
import { FilmsCrewMongoCollection } from "./FilmsCrew/FilmsCrewModel";
import { films } from "./testMock";

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

    // for testing
    await FilmsMongoCollection.deleteMany({});
    await FilmsMongoCollection.insertMany(films);

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
