import { FilmsMongoCollection } from "Film/FilmModel";
import { FilmDto } from "Film/FilmDto";

class FilmService {
  public async getFilms(): Promise<FilmDto[]> {
    const films = await FilmsMongoCollection.find();

    return films.map((f) => new FilmDto(f));
  }

  public async postFilm(newFilm: Omit<FilmDto, "id">): Promise<FilmDto> {
    const postedFilm = await FilmsMongoCollection.insertMany([newFilm]);

    return new FilmDto(postedFilm[0]);
  }

  public async updateFilm(film: FilmDto): Promise<FilmDto> {
    const updatedFilm: any = await FilmsMongoCollection.updateOne(
      { filmId: film.filmId },
      film
    );

    return updatedFilm;
  }

  public async deleteFilm(id: number): Promise<FilmDto> {
    const deletedFilm = await FilmsMongoCollection.deleteOne({ _id: id });

    return deletedFilm;
  }
}

export const filmService = new FilmService();
