import { Date } from "mongoose";

export interface EntriesInterface {
    title: String;
    description: String;
    image: String;
    rating: Number;
    date: Date;
    user: String;
}