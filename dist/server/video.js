"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    fileId: {
        type: String,
        required: true,
        unique: true
    },
    path: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    transcript: {
        type: String,
        required: false,
        allowNull: true,
        default: null
    }
});
const Video = mongoose_1.default.model("video", VideoSchema);
exports.default = Video;
