import { Deepgram } from '@deepgram/sdk';
import fs from 'node:fs'
import dotenv from 'dotenv'

dotenv.config();

// Your Deepgram API Key
const deepgramApiKey = process.env.DEEP_KEY??'';

const mimetype = "video/webm";

let source;

export const transcriptHandler = async (file:string) => {
    
    const deepgram = new Deepgram(deepgramApiKey);
    
    // Check whether requested file is local or remote, and prepare accordingly
    if (file.startsWith("http")) {
        // File is remote
        // Set the source
        source = {
            url: file,
        };
    } else {
        // File is local
        // Open the audio file
        const audio = fs.readFileSync(file);
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
        })

        return (await transcript)?.results?.channels[0].alternatives[0].transcript;
        
    } catch (error) {
        console.log(error);
        return null
    }
}
