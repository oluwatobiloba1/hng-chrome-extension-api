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
exports.transcriptHandler = void 0;
const sdk_1 = require("@deepgram/sdk");
const node_fs_1 = __importDefault(require("node:fs"));
// Your Deepgram API Key
const deepgramApiKey = "";
const mimetype = "video/webm";
let source;
const transcriptHandler = (file) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(file);
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
        console.log(audio);
        // Set the source
        source = {
            buffer: audio,
            mimetype: mimetype,
        };
    }
    // Send the audio to Deepgram and get the response
    deepgram.transcription
        .preRecorded(source, {
        smart_format: true,
        model: "nova",
    })
        .then((response) => {
        // Write the response to the console
        console.dir(response, { depth: null });
        // Write only the transcript to the console
        //console.dir(response.results.channels[0].alternatives[0].transcript, { depth: null });
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.transcriptHandler = transcriptHandler;
