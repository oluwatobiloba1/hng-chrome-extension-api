import {FileFilterCallback, } from  'multer';
import {NextFunction, Request, Response} from 'express'

export const fileFilter =(req:Request, file: Request['file'], cb: FileFilterCallback)=> {

  
    if(file?.mimetype.includes('video/')) {
        return cb(null, true)
    }
    // You can always pass an error if something goes wrong:
    cb(new Error('Oops! something went wrong!'))
  
}

export const checkFilename = (req:Request, res:Response, next: NextFunction)=> {
    
    next()
}