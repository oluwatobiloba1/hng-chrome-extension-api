import express,{ Express } from "express";
import path from 'node:path'
var cors = require('cors')
import uploadRouter from './routes/upload.route'
import './server/db'
import swaggerDocs from "./utils/swagger";
import {connect} from './service/listener'



const app:Express = express();
const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.static(path.join(__dirname,'public/uploads')))
app.use(express.json({limit: '50MB'}));

app.use('',uploadRouter)

swaggerDocs(app, port as any)
connect()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});