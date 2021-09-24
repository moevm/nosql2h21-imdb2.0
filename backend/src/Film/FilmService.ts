import FilmModel from "Film/FilmModel";
import FilmDto from "Film/FilmDto";

class FilmService {
  public async getFilms(): Promise<FilmDto[]> {
    const films = await FilmModel.find();

    return films.map((f) => new FilmDto(f));
  }

  public async postFilm(newFilm: Omit<FilmDto, "id">): Promise<FilmDto> {
    const postedFilm = await FilmModel.insertMany([newFilm]);

    return new FilmDto(postedFilm[0]);
  }

  public async updateFilm(film: FilmDto): Promise<FilmDto> {
    const updatedFilm: any = await FilmModel.updateOne({ _id: film.id }, film);

    return updatedFilm;
  }

  public async deleteFilm(id: number): Promise<FilmDto> {
    const deletedFilm = await FilmModel.deleteOne({ _id: id });

    return deletedFilm;
  }
}

export default new FilmService();
