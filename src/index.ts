import express,{ Express } from "express";

var cors = require('cors')
const fs = require('node:fs');
const router = require("./routes/index.ts");
require('dotenv').config()



// console.log(process.env.CLOUD_NAME, process.env.CLOUD_KEY, process.env.CLOUD_SECRET)

const app:Express = express();
const port = process.env.PORT || 3000;

const htmlFile = fs.readFileSync(`${__dirname}/index.html`, 'utf8');

app.use(cors())

app.use(router)

app.get("/", (req, res) => {
    res.send(htmlFile)
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});