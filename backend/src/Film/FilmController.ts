import express from "express";
import filmService from "Film/FilmService";

class FilmController {
  static async getFilms(
    req: express.Request,
    res: express.Response
    // next: express.NextFunction
  ) {
    try {
      const result = await filmService.getFilms();

      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async postFilm(req: express.Request, res: express.Response) {
    try {
      const film = await filmService.postFilm(req.body);

      res.json(film);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async deleteFilm(req: express.Request, res: express.Response) {
    try {
      const film = await filmService.deleteFilm(req.body.id);

      res.json(film);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async updateFilm(req: express.Request, res: express.Response) {
    try {
      const film = await filmService.updateFilm(req.body);

      res.json(film);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }
}

export default FilmController;
