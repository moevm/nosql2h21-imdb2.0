import { Router } from "express";
import FilmController from "Film/FilmController";

const router = Router();

router.get("/films", FilmController.getFilms);
router.post("/films", FilmController.postFilm);
router.put("/films", FilmController.updateFilm);
router.delete("/films", FilmController.deleteFilm);

export default router;
