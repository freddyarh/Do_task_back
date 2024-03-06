import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_PRO || '');
        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

