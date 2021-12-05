import { Schema, model, Document, Model, Types } from "mongoose";

export interface IWorker {
  _id: Types.ObjectId;
  name: string;
  birthYear: string;
  deathYear: string;
  image: string;
}

const WorkerSchema = new Schema<IWorker, Model<IWorker>, IWorker>({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, required: true },
  birthYear: { type: String, required: false },
  deathYear: { type: String, required: false },
  image: { type: String, required: false },
});

export type WorkersModelType = IWorker & Document;

export const WorkersMongoCollection = model<WorkersModelType>(
  "Workers",
  WorkerSchema
);
