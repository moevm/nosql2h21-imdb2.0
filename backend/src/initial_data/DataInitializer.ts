import parse from "csv-parse";
import fileStream from "fs";
import mongoose from "mongoose";
import { FilmsMongoCollection, IFilm } from "../models/mongoose/FilmModel";
import {
  IWorker,
  WorkersMongoCollection,
} from "../models/mongoose/WorkersModel";
import {
  FilmsCrewMongoCollection,
  IFilmCrew,
} from "../models/mongoose/FilmsCrewModel";

class DataInitializer {
  readonly filmsFilename = `${__dirname}/films_data.tsv`;

  readonly workersFilename = `${__dirname}/workers_data.tsv`;

  readonly filmsCrewFilename = `${__dirname}/filmsCrew_data.tsv`;

  private static getTsvFormatParser(
    amountFrom: number,
    amountTo: number
  ): parse.Parser {
    return parse(
      {
        delimiter: "\t",
        columns: true,
        skip_lines_with_error: true,
        quote: false,
        from: amountFrom,
        to: amountTo,
      },
      (err, data) => {
        // console.log(data);
        // console.log(err);
      }
    );
  }

  private static getFilmTsvParser(): parse.Parser {
    return parse(
      {
        delimiter: "\t",
        columns: true,
        skip_lines_with_error: true,
        quote: false,
        from: 100000,
        to: 105000,
      },
      (err, data) => {
        // console.log(data);
        // console.log(err);
      }
    );
  }

  private filmsSet = new Set<string>();

  private workersSet = new Set<string>();

  async initializeData() {
    await this.initializeFilms();
    await this.initializeFilmsCrew();
    await this.initializeWorkers();
    // await this.printUniqueGenres();
    // console.log("\n");
    // await this.printUniqueCategories();
    // console.log("\n");
  }

  private async printUniqueGenres() {
    const genres = await FilmsMongoCollection.find().distinct("genres");
    console.log(`GENRES\n${genres}`);
  }

  private async printUniqueCategories() {
    const categories = await FilmsCrewMongoCollection.find().distinct(
      "category"
    );
    console.log(`CATEGORIES or PROFESSIONS\n${categories}`);
  }

  private async initializeFilms(): Promise<void> {
    const results: IFilm[] = [];

    return new Promise((resolve) => {
      fileStream
        .createReadStream(this.filmsFilename)
        .pipe(DataInitializer.getFilmTsvParser())
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
            this.filmsSet.add(data.tconst);
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
            // console.log(reason);
          });

          resolve();
        });
    });
  }

  private async initializeWorkers(): Promise<void> {
    const results: IWorker[] = [];

    return new Promise((resolve) => {
      fileStream
        .createReadStream(this.workersFilename)
        .pipe(DataInitializer.getTsvFormatParser(100000, 600000))
        .on("data", (data) => {
          const idStr = DataInitializer.fillTo12Symbols(data.nconst);
          const name = data.primaryName;
          const birthYear = data.birthYear === "\\N" ? null : data.birthYear;
          const deathYear = data.deathYear === "\\N" ? null : data.deathYear;

          if (name && this.workersSet.has(data.nconst)) {
            results.push(<IWorker>{
              _id: mongoose.Types.ObjectId(idStr),
              name: name,
              birthYear: birthYear,
              deathYear: deathYear,
            });
          }
        })
        .on("end", async () => {
          await WorkersMongoCollection.insertMany(results).catch((reason) => {
            //  console.log(reason);
          });

          resolve();
        });
    });
  }

  private static parseCharacterStr(str: string): string | null {
    try {
      const returnable = JSON.parse(str).join(", ");

      return returnable;
    } catch (e) {
      return null;
    }
  }

  private initializeFilmsCrew(): Promise<void> {
    const results: IFilmCrew[] = [];

    return new Promise<void>((resolve) => {
      fileStream
        .createReadStream(this.filmsCrewFilename)
        .pipe(DataInitializer.getTsvFormatParser(500000, 1500000))
        .on("data", (data) => {
          const filmId = DataInitializer.fillTo12Symbols(data.tconst);
          const workerId = DataInitializer.fillTo12Symbols(data.nconst);
          const characters =
            data.characters === "\\N"
              ? null
              : DataInitializer.parseCharacterStr(data.characters);
          if (this.filmsSet.has(data.tconst) && this.workersSet.size <= 5000) {
            this.workersSet.add(data.nconst);
            results.push(<IFilmCrew>{
              filmId: mongoose.Types.ObjectId(filmId),
              workerId: mongoose.Types.ObjectId(workerId),
              category:
                data.category === "\\N"
                  ? null
                  : data.category === "actress"
                  ? "actor"
                  : data.category,
              characters: characters,
            });
          }
        })
        .on("end", async () => {
          // console.log(results);
          await FilmsCrewMongoCollection.insertMany(results).catch((reason) => {
            // console.log(reason);
          });

          resolve();
        });
    });
  }

  private static fillTo12Symbols(initialString: string): string {
    let returnableString = initialString;
    while (returnableString.length !== 12) {
      returnableString += "_";
    }

    return returnableString;
  }
}

export const dataInitializer = new DataInitializer();
