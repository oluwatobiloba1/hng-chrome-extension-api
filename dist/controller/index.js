"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadVideo = exports.startUpload = void 0;
const uuid_1 = require("uuid");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const video_1 = __importDefault(require("../server/video"));
const service_1 = require("../service");
require('dotenv').config();
const startUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = (0, uuid_1.v4)();
    const filePath = `${process.env.BASE_URL}/${fileId}.webm`;
    const videoData = {
        fileId: fileId,
        format: 'webm',
        path: filePath
    };
    const writeToFile = node_path_1.default.join(__dirname, '../', `public/uploads/${videoData.fileId}.webm`);
    const newVideo = new video_1.default(videoData);
    yield newVideo.save();
    if (!newVideo) {
        return res.status(500).json({ message: 'starting recording failed' });
    }
    console.log(newVideo.id);
    node_fs_1.default.writeFileSync(writeToFile, Buffer.alloc(0));
    return res.status(200).json({ message: 'starting recording successfully', id: newVideo.id });
});
exports.startUpload = startUpload;
const uploadVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chunk } = req.body;
    const { id } = req.params;
    const currentVideo = yield video_1.default.findById(id);
    if (!currentVideo) {
        return res.status(500).json({ message: 'this video does not exist' });
    }
    const writeToFile = node_path_1.default.join(__dirname, '../', `public/uploads/${currentVideo.fileId}.webm`);
    if (req.url === `/finish/${id}`) {
        const transcript = yield (0, service_1.transcriptHandler)(writeToFile);
        console.log(transcript);
        const updatedVideo = yield video_1.default.findByIdAndUpdate(id, { transcript: transcript }, { new: true });
        if (!updatedVideo) {
            return res.status(500).json({ message: 'sorry something went wrong' });
        }
        return res.status(200).json({
            video: { id: updatedVideo.id, transcript: updatedVideo.transcript, path: currentVideo.path }
        });
    }
    if (!chunk) {
        return res.status(500).json({ message: 'chunk is required' });
    }
    const previousChunk = node_fs_1.default.readFileSync(writeToFile);
    const buffer = Buffer.concat([previousChunk, Buffer.from(chunk, 'base64')]);
    node_fs_1.default.writeFileSync(writeToFile, buffer);
    return res.status(200).json({ message: 'chunk uploaded successfully', id });
});
exports.uploadVideo = uploadVideo;
