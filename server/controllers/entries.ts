import { response, request, json } from "express";
import fs from "fs";
import path from "path";
import { EntriesInterface } from '../interfaces/entries'

import Entries from '../models/entries';


export const setEntries = async(req = request, res = response) => {

    const body = req.body;
    const file: Express.Multer.File | undefined = req.file;

    
    const data: EntriesInterface = {
        ...body,
        image: file?.filename
    }
    
    const entries = new Entries(data);
                                         
    await entries.save();

    res.json({
        ok: true,
        msj: 'Your entry has saved successfully',
        entries
    });
};
export const updateLastEntry = async(req = request, res = response) => {
    const id = req.params;
    const { title, description, ...rest } = req.body;
    const entry = await Entries.findOneAndUpdate( id , { title, description }, { new: true } ).exec();

    return res.json({ 
        ok: true,
        msj: "Successfull",
        entry
    });

};

export const getLastEntry = async(req = request, res = response) => {

    const lastEntry = await Entries.find().limit(1).sort({$natural:-1}) 

    res.json({
        ok: true,
        msj: 'Access true',
        lastEntry
    });
};

export const getEntries = async(req = request, res = response) => {

    const entries = await Entries.find({});

    res.json({
        ok: true,
        msj: 'Access true',
        entries
    });
};
export const getImageFileEntries = async(req = request, res = response) => {

    const { id } = req.params;

    const pathImagen = path.join( __dirname, `../../uploads/${ id }` );
        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }

    const pathNoImagen = path.join( __dirname, '../../assets/no-image.jpg');
    res.sendFile( pathNoImagen );


};