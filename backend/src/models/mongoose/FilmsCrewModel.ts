import { Schema, model, Document, Model } from "mongoose";

interface IFilmCrew {
  filmId: Schema.Types.ObjectId;
  workerId: Schema.Types.ObjectId;
  category: string;
  characters: string;
}

const FilmCrewSchema = new Schema<IFilmCrew, Model<IFilmCrew>, IFilmCrew>({
  filmId: { type: Schema.Types.ObjectId },
  workerId: { type: Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  characters: { type: String, required: false },
});

export type FilmsCrewModelType = IFilmCrew & Document;

export const FilmsCrewMongoCollection = model<FilmsCrewModelType>(
  "FilmsCrew",
  FilmCrewSchema
);
