import { Schema, model, Document, Model } from "mongoose";

interface IFilm {
  name: string;
  director: string;
  releaseDate: string;
}

const FilmSchema = new Schema<IFilm, Model<IFilm>, IFilm>({
  name: { type: String, required: true },
  director: { type: String, required: true },
  releaseDate: { type: String, required: true },
});

export type FilmModelType = IFilm & Document;

const Film = model<FilmModelType>("Film", FilmSchema);

export default Film;
