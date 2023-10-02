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
exports.connect = void 0;
const video_1 = __importDefault(require("../server/video"));
const amqplib_1 = __importDefault(require("amqplib"));
const index_1 = require("./index");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield amqplib_1.default.connect("amqps://hhlzklho:p7RP8QipZIZ3zXGgzJKZDxgQ_EfOYbST@chimpanzee.rmq.cloudamqp.com/hhlzklho");
            const channel = yield connection.createChannel();
            const result = yield channel.assertQueue("transcriptions");
            channel.consume("transcriptions", (message) => __awaiter(this, void 0, void 0, function* () {
                console.log(message === null || message === void 0 ? void 0 : message.content.toString());
                if (message) {
                    const input = JSON.parse(message === null || message === void 0 ? void 0 : message.content.toString());
                    console.log(input);
                    const id = input.id;
                    if (input.file) {
                        console.log("file received");
                        const transcript = yield (0, index_1.transcriptHandler)(input.file);
                        channel.ack(message);
                        try {
                            yield video_1.default.findByIdAndUpdate(id, { transcript: transcript }, { new: true });
                        }
                        catch (error) {
                            console.error(error);
                        }
                    }
                }
            }));
        }
        catch (ex) {
            console.error(ex);
        }
    });
}
exports.connect = connect;
