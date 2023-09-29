import { Request, Response } from 'express';
import fs from 'node:fs'
import path from 'node:path'

require('dotenv').config()

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET 
});

console.log(process.env.CLOUD_NAME, process.env.CLOUD_KEY, process.env.CLOUD_SECRET)

const uploadVideo = async (req: Request, res: Response) => {
    console.log(req.file)
    const fileToUpload = path.join(__dirname,'../../', `/uploads/${req?.file?.filename}` )

    if(req?.file){
        await cloudinary.uploader.upload_large(fileToUpload,
        { resource_type: "video",use_filename:true }, 
        function(error, result) {
            if(error){
                console.log(error)
                throw new Error('Something went wrong')
            }
            else{
                console.log(result)
                return res.send({message:'uploaded successfully', url: result?.secure_url})
            }
            });
    }

}

module.exports = uploadVideo;