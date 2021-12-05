import { Schema, model, Document, Model, Types } from "mongoose";

export interface IFilmCrew {
  filmId: Types.ObjectId;
  workerId: Types.ObjectId;
  category: string;
  characters: string;
}

const FilmCrewSchema = new Schema<IFilmCrew, Model<IFilmCrew>, IFilmCrew>({
  filmId: { type: Types.ObjectId, required: true },
  workerId: { type: Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  characters: { type: String, required: false },
});

export type FilmsCrewModelType = IFilmCrew & Document;

export const FilmsCrewMongoCollection = model<FilmsCrewModelType>(
  "FilmsCrew",
  FilmCrewSchema
);
