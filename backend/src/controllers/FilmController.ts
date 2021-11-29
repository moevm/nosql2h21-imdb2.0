import express from "express";
import { filmService } from "service/FilmService";

export class FilmController {
  static async getFilmsOverview(
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

  static async getFilmById(req: express.Request, res: express.Response) {
    try {
      const film = await filmService.getFilmById(req.params.id);
      res.json(film);
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
