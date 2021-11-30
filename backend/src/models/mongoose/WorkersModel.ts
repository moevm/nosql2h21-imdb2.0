import { Schema, model, Document, Model } from "mongoose";

interface IWorker {
  _id: Schema.Types.ObjectId;
  name: string;
  birthYear: string;
  deathYear: string;
  image: string;
}

const WorkerSchema = new Schema<IWorker, Model<IWorker>, IWorker>(
  {
    _id: { type: Schema.Types.ObjectId },
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
