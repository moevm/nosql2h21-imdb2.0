import parse from "csv-parse";
import fileStream from "fs";
import { FilmShortInfoDto } from "../models/dto/FilmShortInfoDto";

class DataInitializer {
  readonly filmsFilename = "test_data.tsv";

  readonly workersFilename = "workers_data.tsv";

  readonly filmsCrewFilename = "filmsCrew_data.tsv";

  readonly tsvFormat = parse({ delimiter: "  " }, (err, data) => {
    console.log(data);
  });

  initializeData() {
    this.initializeFilms();
    this.initializeWorkers();
    this.initializeFilmsCrew();
  }

  private initializeFilms() {
    const results = [];
    fileStream
      .createReadStream(this.filmsFilename)
      .pipe(this.tsvFormat)
      .on("data", (data) => {
        data.nconst = "dawda";
      });
  }

  private initializeWorkers() {}

  private initializeFilmsCrew() {}
}

export const dataInitializer = new DataInitializer();
