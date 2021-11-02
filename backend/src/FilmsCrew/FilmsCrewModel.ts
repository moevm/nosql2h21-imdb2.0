import { Schema, model, Document, Model } from "mongoose";

interface IFilmCrew {
  filmId: string;
  workerId: string;
  category: string;
  characters: string;
}

const FilmCrewSchema = new Schema<IFilmCrew, Model<IFilmCrew>, IFilmCrew>({
  filmId: { type: String, required: true },
  workerId: { type: String, required: true },
  category: { type: String, required: true },
  characters: { type: String, required: true },
});

export type FilmsCrewModelType = IFilmCrew & Document;

export const FilmsCrewMongoCollection = model<FilmsCrewModelType>(
  "FilmsCrew",
  FilmCrewSchema
);
