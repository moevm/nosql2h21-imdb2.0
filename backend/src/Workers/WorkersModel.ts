import { Schema, model, Document, Model } from "mongoose";

interface IWorker {
  workerId: string;
  name: string;
  birthYear: string;
  deathYear: string;
  image: string;
}

const WorkerSchema = new Schema<IWorker, Model<IWorker>, IWorker>({
  workerId: { type: String, required: true },
  name: { type: String, required: true },
  birthYear: { type: String, required: true },
  deathYear: { type: String, required: true },
  image: { type: String, required: true },
});

export type WorkersModelType = IWorker & Document;

export const WorkersMongoCollection = model<WorkersModelType>(
  "Workers",
  WorkerSchema
);
