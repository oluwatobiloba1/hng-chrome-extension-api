import amqp from "amqplib";
import dotenv from 'dotenv'

dotenv.config();

export const publisher = async function(file:string, id: string){
    const fileUrl = JSON.stringify({file, id})
    try{
        console.log('trying to publish')
        const connection = await amqp.connect(process.env.AMQP_URL as string);
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("transcriptions");
        channel.sendToQueue("transcriptions", Buffer.from(fileUrl));
        console.log('message sent succcessfully')
        return true;
    }
    catch(ex){
        console.error(ex);
        return false;
    }
}