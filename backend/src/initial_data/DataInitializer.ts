import parse from "csv-parse";
import fileStream from "fs";
import mongoose, { AnyObject } from "mongoose";
import { FilmShortInfoDto } from "../models/dto/FilmShortInfoDto";
import {
  FilmModelType,
  FilmsMongoCollection,
  IFilm,
} from "../models/mongoose/FilmModel";
import {
  IWorker,
  WorkersMongoCollection,
} from "../models/mongoose/WorkersModel";

class DataInitializer {
  readonly filmsFilename = `${__dirname}/films_data.tsv`;

  readonly workersFilename = `${__dirname}/workers_data.tsv`;

  readonly filmsCrewFilename = "filmsCrew_data.tsv";

  private static getTsvFormatParser(amountTo: number): parse.Parser {
    return parse(
      {
        delimiter: "\t",
        columns: true,
        skip_lines_with_error: true,
        quote: false,
        to: amountTo,
      },
      (err, data) => {
        // console.log(data);
        // console.log(err);
      }
    );
  }

  async initializeData() {
    await this.initializeFilms();
    await this.initializeWorkers();
    this.initializeFilmsCrew();
  }

  private async initializeFilms() {
    const results: IFilm[] = [];
    fileStream
      .createReadStream(this.filmsFilename)
      .pipe(DataInitializer.getTsvFormatParser(80000))
      .on("data", (data) => {
        const idStr = DataInitializer.fillTo12Symbols(data.tconst);
        const title = data.primaryTitle;
        const filmGenres = (data.genres as String)
          ?.split(",")
          ?.filter((genre: String) => genre !== "\\N");
        const duration = Number(data.runtimeMinutes);
        // console.log(data.isAdult);
        if (title && (data.titleType as String) === "movie") {
          // console.log(title);
          results.push(<IFilm>{
            _id: mongoose.Types.ObjectId(idStr),
            title: title,
            isAdult: data.isAdult,
            releaseYear: data.startYear,
            duration: Number.isNaN(duration) ? null : duration,
            genres: filmGenres,
            poster: "",
          });
        }
      })
      .on("end", async () => {
        // console.log(results);
        await FilmsMongoCollection.insertMany(results).catch((reason) => {
          console.log(reason);
        });
      });
  }

  private async initializeWorkers() {
    const results: IWorker[] = [];
    fileStream
      .createReadStream(this.workersFilename)
      .pipe(DataInitializer.getTsvFormatParser(20000))
      .on("data", (data) => {
        const idStr = DataInitializer.fillTo12Symbols(data.nconst);
        const name = data.primaryName;
        const birthYear = data.birthYear === "\\N" ? null : data.birthYear;
        const deathYear = data.deathYear === "\\N" ? null : data.deathYear;

        if (name) {
          results.push(<IWorker>{
            _id: mongoose.Types.ObjectId(idStr),
            name: name,
            birthYear: birthYear,
            deathYear: deathYear,
          });
        }
      })
      .on("end", async () => {
        // console.log(results);
        await WorkersMongoCollection.insertMany(results).catch((reason) => {
          console.log(reason);
        });
      });
  }

  private initializeFilmsCrew() {}

  private static fillTo12Symbols(initialString: string): string {
    let returnableString = initialString;
    while (returnableString.length !== 12) {
      returnableString += "_";
    }

    return returnableString;
  }
}

export const dataInitializer = new DataInitializer();
