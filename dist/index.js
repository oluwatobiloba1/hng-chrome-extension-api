"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
var cors = require('cors');
const fs = require('node:fs');
const upload_route_1 = __importDefault(require("./routes/upload.route"));
require("./server/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// const htmlFile = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
app.use(cors());
app.use(express_1.default.static(node_path_1.default.join(__dirname, 'public/uploads')));
app.use(express_1.default.json({ limit: '50MB' }));
app.use('', upload_route_1.default);
// app.get("/", (req, res) => {
//     res.send('index.html')
// });
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
