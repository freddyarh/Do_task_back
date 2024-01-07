import express from "express";
import cors from "cors";
import path from "path";

import { dbConnection } from "./database/config";


class Server {

    public app: express.Application;
    public port;
    public usersPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/journal'; 

        this.connectDB();
        this.middlewares(); 
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    
    middlewares(){
        this.app.use( cors() );
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use( express.json() );

        this.app.use( express.static(path.join(__dirname, "public")) );
    }
    
    routes(){
        this.app.use( this.usersPath, require('./routes/index'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running at', this.port );
        });
    }
}

module.exports = Server;