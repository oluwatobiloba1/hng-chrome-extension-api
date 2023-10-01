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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcriptHandler = void 0;
const sdk_1 = require("@deepgram/sdk");
const node_fs_1 = __importDefault(require("node:fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Your Deepgram API Key
const deepgramApiKey = (_a = process.env.DEEP_KEY) !== null && _a !== void 0 ? _a : '';
const mimetype = "video/webm";
let source;
const transcriptHandler = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const deepgram = new sdk_1.Deepgram(deepgramApiKey);
    // Check whether requested file is local or remote, and prepare accordingly
    if (file.startsWith("http")) {
        // File is remote
        // Set the source
        source = {
            url: file,
        };
    }
    else {
        // File is local
        // Open the audio file
        const audio = node_fs_1.default.readFileSync(file);
        // Set the source
        source = {
            buffer: audio,
            mimetype: mimetype,
        };
    }
    try {
        const transcript = deepgram.transcription
            .preRecorded(source, {
            smart_format: true,
            model: "nova",
        });
        return (_c = (_b = (yield transcript)) === null || _b === void 0 ? void 0 : _b.results) === null || _c === void 0 ? void 0 : _c.channels[0].alternatives[0].transcript;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.transcriptHandler = transcriptHandler;
