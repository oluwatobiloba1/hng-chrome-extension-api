import express,{ Express } from "express";
import path from 'node:path'
var cors = require('cors')
const fs = require('node:fs');
import uploadRouter from './routes/upload.route'
import './server/db'




const app:Express = express();
const port = process.env.PORT || 3000;

const htmlFile = fs.readFileSync(`${__dirname}/index.html`, 'utf8');

app.use(cors())
app.use(express.static(path.join(__dirname,'public/uploads')))
app.use(express.json({limit: '50MB'}));

app.use('',uploadRouter)

app.get("/", (req, res) => {
    res.send(htmlFile)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});