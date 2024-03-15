import { Date, Document } from "mongoose";

export interface EntriesInterface extends Document {
    title: String;
    description: String;
    image: String;
    rating: Number;
    date: Date;
    user: String;
}