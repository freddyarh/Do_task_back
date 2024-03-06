import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async() => {

    try {

        await mongoose.connect('mongodb+srv://user_node_disability:YoxQ7h6k2ZswBs35@disabilityappcluster.vd7ecej.mongodb.net/journal_back');
        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error starting database');
    }


}

