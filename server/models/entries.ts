import { Schema, model } from "mongoose";
import { EntriesInterface } from "../interfaces/entries";

const EntriesSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  description: String,
  date:   String,
  image: String,
  rating : Number,
  user: String
});

const Entries = model<EntriesInterface>("Entries", EntriesSchema);

export default Entries;