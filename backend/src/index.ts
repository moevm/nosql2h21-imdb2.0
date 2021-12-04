import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";
import { FilmsMongoCollection } from "./models/mongoose/FilmModel";
import { FilmsCrewMongoCollection } from "./models/mongoose/FilmsCrewModel";
import { films } from "./testMock";
import { dataInitializer } from "./initial_data/DataInitializer";

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

    await FilmsCrewMongoCollection.collection.createIndex(
      { filmId: 1, workerId: 1, category: 1, character: 1 },
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
