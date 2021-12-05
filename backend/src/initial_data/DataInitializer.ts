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
import {
  FilmsCrewMongoCollection,
  IFilmCrew,
} from "../models/mongoose/FilmsCrewModel";

class DataInitializer {
  readonly filmsFilename = `${__dirname}/films_data.tsv`;

  readonly workersFilename = `${__dirname}/workers_data.tsv`;

  readonly filmsCrewFilename = `${__dirname}/filmsCrew_data.tsv`;

  private static getTsvFormatParser(amountTo: number | null): parse.Parser {
    return parse(
      {
        delimiter: "\t",
        columns: true,
        skip_lines_with_error: true,
        quote: false,
        to: amountTo || 100000,
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
  }

  private async initializeFilms(): Promise<void> {
    const results: IFilm[] = [];

    return new Promise((resolve) => {
      fileStream
        .createReadStream(this.filmsFilename)
        .pipe(DataInitializer.getTsvFormatParser(5000))
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
            console.log(reason);
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
        .pipe(DataInitializer.getTsvFormatParser(null))
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
          // console.log(results);
          await WorkersMongoCollection.insertMany(results).catch((reason) => {
            console.log(reason);
          });

          resolve();
        });
    });
  }

  private initializeFilmsCrew() {
    const results: IFilmCrew[] = [];
    fileStream
      .createReadStream(this.filmsCrewFilename)
      .pipe(DataInitializer.getTsvFormatParser(null))
      .on("data", (data) => {
        const filmId = DataInitializer.fillTo12Symbols(data.tconst);
        const workerId = DataInitializer.fillTo12Symbols(data.nconst);
        const characters =
          data.characters === "\\N"
            ? null
            : JSON.parse(data.characters).join(", ");
        if (this.filmsSet.has(data.tconst) && this.filmsSet.size <= 5000) {
          this.workersSet.add(data.nconst);
          results.push(<IFilmCrew>{
            filmId: mongoose.Types.ObjectId(filmId),
            workerId: mongoose.Types.ObjectId(workerId),
            category: data.category === "\\N" ? null : data.category,
            characters: characters,
          });
        }
      })
      .on("end", async () => {
        // console.log(results);
        await FilmsCrewMongoCollection.insertMany(results).catch((reason) => {
          console.log(reason);
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
