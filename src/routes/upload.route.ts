import express, { Request } from 'express'
import path from 'node:path'
import multer, {FileFilterCallback, } from  'multer';

import { startUpload, uploadVideo } from '../controller';

const router = express.Router()

// router.get('/g', getVideo)
router.post('/start', startUpload)
router.put('/upload/:id', uploadVideo)
router.post('/finish/:id', uploadVideo)

export default router
// module.exports = router
