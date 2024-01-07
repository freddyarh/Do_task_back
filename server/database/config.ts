import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async() => {

    try {

        await mongoose.connect( 'mongodb://localhost:27017/diary_note');
        console.log('Database online');
    

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

