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

    const newVideo = new Video(videoData);
        await newVideo.save();
        if(!newVideo){
            return res.status(500).json({message: 'starting recording failed'})
        }
        console.log(newVideo.id)
        return res.status(200).json({message: 'starting recording successfully', id: newVideo.id})

}


export const uploadVideo = async (req: Request, res: Response) => {

    const {chunk} = req.body;
    const {id} = req.params;
    const currentVideo = await Video.findById(id);
    console.log(currentVideo)

    if(!currentVideo){
        return res.status(500).json({message: 'this video does not exist'})
    }
    
    const writeToFile = path.join(__dirname,'../', `public/uploads/${currentVideo.fileId}.webm`);
    console.log(writeToFile)
    
    const writeableStream = fs.createWriteStream(writeToFile);
    if(req.url === `/finish/${id}`){
        writeableStream.end();
        // await transcriptHandler(writeToFile)
        return res.status(200).json({message: 'Video uploaded successfully', video: {id: currentVideo.id,format: currentVideo.format, path: currentVideo.path}})
    
    }

    if(!chunk){
        return res.status(500).json({message: 'chunk is required'})
    }

    const buffer = Buffer.from(chunk, 'base64');

    writeableStream.write(buffer);

    writeableStream.on('error', (err) => {
        console.error('Error writing to writable stream:', err);
        return;
    });
    return res.status(200).json({message: 'chunk uploaded successfully', id})
   
    
}

// export const getVideo = async (req: Request, res: Response) => {
//     
// }

