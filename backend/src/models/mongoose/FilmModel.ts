import { Schema, model, Document, Model } from "mongoose";

interface IFilm {
  _id: Schema.Types.ObjectId;
  title: string;
  isAdult: boolean;
  releaseYear: string;
  duration: number;
  genres: [string];
  poster: string;
}

const FilmSchema = new Schema<IFilm, Model<IFilm>, IFilm>({
  _id: { type: Schema.Types.ObjectId },
  title: { type: String, required: true },
  isAdult: { type: Boolean, required: true },
  releaseYear: { type: String, required: true },
  duration: { type: Number, required: true },
  genres: { type: [String], required: true },
  poster: { type: String, required: false },
});

export type FilmModelType = IFilm & Document;

export const FilmsMongoCollection = model<FilmModelType>("Films", FilmSchema);
