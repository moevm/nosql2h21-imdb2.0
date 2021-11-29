import express from "express";
import { workersService } from "../service/WorkersService";

export class WorkersController {
  static async getWorkers(
    req: express.Request,
    res: express.Response
    // next: express.NextFunction
  ) {
    try {
      const result = await workersService.getWorkers();

      res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async getWorkerById(req: express.Request, res: express.Response) {
    try {
      const worker = await workersService.getWorkerById(req.body.id);
      res.json(worker);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async postWorker(req: express.Request, res: express.Response) {
    try {
      const worker = await workersService.postWorker(req.body);

      res.json(worker);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }

  static async updateWorker(req: express.Request, res: express.Response) {
    try {
      const worker = await workersService.updateWorker(req.body);

      res.json(worker);
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message);
      }
    }
  }
}
