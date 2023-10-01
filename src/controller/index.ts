import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs'
import path from 'node:path'
import Video from '../server/video';
import { transcriptHandler } from '../service';

require('dotenv').config()



export const startUpload = async (req: Request, res: Response) => {
    
    const fileId = uuidv4();
    const filePath = `${process.env.BASE_URL}/${fileId}.webm`;
    
    const videoData = {
        fileId: fileId,
        format: 'webm',
        path: filePath
    }
    
    const writeToFile = path.join(__dirname,'../', `public/uploads/${videoData.fileId}.webm`);


    const newVideo = new Video(videoData);
        await newVideo.save();
        if(!newVideo){
            return res.status(500).json({message: 'starting recording failed'})
        }
        console.log(newVideo.id)
        fs.writeFileSync(writeToFile, Buffer.alloc(0));
        return res.status(200).json({message: 'starting recording successfully', id: newVideo.id})

}


export const uploadVideo = async (req: Request, res: Response) => {

    const {chunk} = req.body;
    const {id} = req.params;
    const currentVideo = await Video.findById(id);

    if(!currentVideo){
        return res.status(500).json({message: 'this video does not exist'})
    }
    
    const writeToFile = path.join(__dirname,'../', `public/uploads/${currentVideo.fileId}.webm`);
    
    if(req.url === `/finish/${id}`){
        const transcript = await transcriptHandler(writeToFile)

        const updatedVideo = await Video.findByIdAndUpdate(id, {transcript: transcript}, {new: true});
        if(!updatedVideo){
            return res.status(500).json({message: 'sorry something went wrong'})    
        }
        return res.status(200).json({ 
        video: {id: updatedVideo.id,transcript: updatedVideo.transcript, path: currentVideo.path}})
        
    }
    
    if(!chunk){
        return res.status(500).json({message: 'chunk is required'})
    }
    
    const previousChunk = fs.readFileSync(writeToFile)

    const buffer = Buffer.concat([previousChunk, Buffer.from(chunk, 'base64')]);

    fs.writeFileSync(writeToFile, buffer);
    
    return res.status(200).json({message: 'chunk uploaded successfully', id})
   
    
}


