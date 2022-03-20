import mongoose, {Model, Schema} from "mongoose";
import { Entry } from "../interfaces";

export interface IEntry extends Entry {}

const entrySchema: Schema = new Schema({
  description: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  status: {
    type: String,
    enum: {
      values: ['pending', 'in-progress', 'finished'],
      message: '{VALUE} is not a valid status}'
    },
    default: 'pending'
  }
});

// Nos ayuda a no tener que redifinir el modelo de mongoose por los requests
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema)

export default EntryModel;