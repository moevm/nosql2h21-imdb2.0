import parse from "csv-parse";
import fileStream from "fs";
import mongoose, { AnyObject } from "mongoose";
import { FilmShortInfoDto } from "../models/dto/FilmShortInfoDto";
import {
  FilmModelType,
  FilmsMongoCollection,
  IFilm,
} from "../models/mongoose/FilmModel";

class DataInitializer {
  readonly filmsFilename = `${__dirname}/films_data.tsv`;

  readonly workersFilename = "workers_data.tsv";

  readonly filmsCrewFilename = "filmsCrew_data.tsv";

  readonly tsvFormat = parse(
    { delimiter: "\t", columns: true, to: 4000 },
    (err, data) => {
      // console.log(data);
    }
  );

  async initializeData() {
    await this.initializeFilms();
    this.initializeWorkers();
    this.initializeFilmsCrew();
  }

  private async initializeFilms() {
    const results: IFilm[] = [];
    fileStream
      .createReadStream(this.filmsFilename)
      .pipe(this.tsvFormat)
      .on("data", (data) => {
        const idStr = this.fillTo12Symbols(data.tconst);
        const title = data.primaryTitle;
        const filmGenres = data.genres?.split(",");
        const duration = Number(data.runtimeMinutes);
        // console.log(data.isAdult);
        // console.log(title);
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

  private initializeWorkers() {}

  private initializeFilmsCrew() {}

  private fillTo12Symbols(initialString: string): string {
    let returnableString = initialString;
    while (returnableString.length !== 12) {
      returnableString += "_";
    }
    console.log(returnableString);

    return returnableString;
  }
}

export const dataInitializer = new DataInitializer();
