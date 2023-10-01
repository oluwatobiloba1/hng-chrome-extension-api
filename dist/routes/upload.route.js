"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
// router.get('/g', getVideo)
router.post('/start', controller_1.startUpload);
router.put('/upload/:id', controller_1.uploadVideo);
router.post('/finish/:id', controller_1.uploadVideo);
exports.default = router;
// module.exports = router
