import Video from '../server/video';
import amqp from 'amqplib';
import {transcriptHandler} from './index'
import { Response } from 'express';


export async function connect(){
    try{
        const connection = await amqp.connect("amqps://hhlzklho:p7RP8QipZIZ3zXGgzJKZDxgQ_EfOYbST@chimpanzee.rmq.cloudamqp.com/hhlzklho");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("transcriptions");

        channel.consume("transcriptions", async (message) => {
            console.log(message?.content.toString());
            if(message){
                const input = JSON.parse(message?.content.toString());
                console.log(input)
                const id = input.id;
                
                if(input.file){
                    console.log("file received")
                    
                    const transcript = await transcriptHandler(input.file)
                    channel.ack(message);
                    
        
                   try {
                       await Video.findByIdAndUpdate(id, {transcript: transcript}, {new: true});
                   } catch (error) {
                        console.error(error);
                   }
                }

            }

        });
    }
    catch(ex){
        console.error(ex);
    }
}


