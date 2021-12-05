import { Schema, model, Document, Model, Types } from "mongoose";

interface IWorker {
  _id: Types.ObjectId;
  name: string;
  birthYear: string;
  deathYear: string;
  image: string;
}

const WorkerSchema = new Schema<IWorker, Model<IWorker>, IWorker>(
  {
    _id: { type: Types.ObjectId },
    name: { type: String, required: true },
    birthYear: { type: String, required: true },
    deathYear: { type: String, required: true },
    image: { type: String, required: true },
  },
  { _id: false }
);

export type WorkersModelType = IWorker & Document;

export const WorkersMongoCollection = model<WorkersModelType>(
  "Workers",
  WorkerSchema
);
