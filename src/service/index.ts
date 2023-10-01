import { Deepgram } from '@deepgram/sdk';
import fs from 'node:fs'

// Your Deepgram API Key
const deepgramApiKey = "";

const mimetype = "video/webm";

let source;

export const transcriptHandler = async (file:string) => {
    console.log(file)
    
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
    
        console.log(audio)
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
}
