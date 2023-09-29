import express, { Request } from 'express'
const router = express.Router()
import multer, {FileFilterCallback, } from  'multer';
import { checkFilename, fileFilter } from '../middleware';

const uploadVideo= require('../controller/index.ts');

// const upload = multer({ dest: 'uploads/' ,fileFilter});

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const fileType = file.mimetype.split('/')[1]
      const uniqueSuffix = Date.now()
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileType)
    }
  })
  
  const upload = multer({ storage: storage })


// middleware that is specific to this router
router.use(checkFilename);

router.use(upload.single('upload_file'), )

router.post('/upload-video', uploadVideo)


module.exports = router