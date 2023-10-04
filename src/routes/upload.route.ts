import express, { Request } from 'express'
import path from 'node:path'
import multer, {FileFilterCallback, } from  'multer';

import { getVideo, startUpload, uploadVideo, getAllVideo } from '../controller';

const router = express.Router()
/**
 * @openapi
 * /video/{id}:
 *  get:
 *    tag: video 
 *  parameters:
 *      - name: id
 *      - in: path
 *      - description: id of the video to request.
 *      - required: true
 */
router.get('/video/:id', getVideo)
/**
 * @openapi
 * /video:
 *  get:
 *    tag: video 
 */
router.get('/video', getAllVideo)

/**
 * @openapi
 * /start:
 *  post:
 *    tag: video 
 *  responses:
 *    200:
 *      description: A successful response
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      -id
 *                     
 *
 */
router.post('/start', startUpload)

/**
 * @openapi
 * /upload/{id}:
 *  put:
 *    tag: video 
 *  parameters:
 *      - name: id
 *      - in: path
 *      - description: id of the video for uploading chunks of string data
 *      - required: true
 */
router.put('/upload/:id', uploadVideo)

/**
 * @openapi
 * /finish/{id}:
 *  post:
 *    tag: video 
 *  parameters:
 *    - name: id
 *    - in: path
 *    - description: id of the video for completing upload
 *    - required: true
 */
router.post('/finish/:id', uploadVideo)

export default router
// module.exports = router
