import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import { FilmsMongoCollection } from "./models/mongoose/FilmModel";
import { FilmsCrewMongoCollection } from "./models/mongoose/FilmsCrewModel";
import { dataInitializer } from "./initial_data/DataInitializer";
import { WorkersMongoCollection } from "./models/mongoose/WorkersModel";

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
      useFindAndModify: false,
    });

    await FilmsCrewMongoCollection.collection.createIndex(
      { filmId: 1, workerId: 1, category: 1, character: 1 },
      { unique: true }
    );

    await FilmsMongoCollection.deleteMany({});
    await WorkersMongoCollection.deleteMany({});
    await FilmsCrewMongoCollection.deleteMany({});
    await dataInitializer.initializeData();

    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
