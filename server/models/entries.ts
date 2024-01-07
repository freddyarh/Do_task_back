import { Schema, model } from "mongoose";

const EntriesSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  description: String,
  date:   String,
  image: String,
  rating : Number,
  user: String
});

const Entries = model("Entries", EntriesSchema);

export default Entries;