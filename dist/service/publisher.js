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
exports.publisher = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const publisher = function (file, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileUrl = JSON.stringify({ file, id });
        try {
            console.log('trying to publish');
            const connection = yield amqplib_1.default.connect("amqps://hhlzklho:p7RP8QipZIZ3zXGgzJKZDxgQ_EfOYbST@chimpanzee.rmq.cloudamqp.com/hhlzklho");
            const channel = yield connection.createChannel();
            const result = yield channel.assertQueue("transcriptions");
            channel.sendToQueue("transcriptions", Buffer.from(fileUrl));
            console.log('message sent succcessfully');
            return true;
        }
        catch (ex) {
            console.error(ex);
            return false;
        }
    });
};
exports.publisher = publisher;
