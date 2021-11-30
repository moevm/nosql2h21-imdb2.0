import { Router } from "express";
import { FilmController } from "controllers/FilmController";
import { WorkersController } from "../controllers/WorkersController";

const router = Router();

router.get("/films/overview", FilmController.getFilmsOverview);
router.get("/films/:id", FilmController.getFilmById);
router.post("/films", FilmController.postFilm);
router.put("/films", FilmController.updateFilm);

router.get("/workers", WorkersController.getWorkers);
router.post("/workers", WorkersController.postWorker);
router.put("/workers", WorkersController.updateWorker);

export default router;
