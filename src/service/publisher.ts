import amqp from "amqplib";

export const publisher = async function(file:string, id: string){
    const fileUrl = JSON.stringify({file, id})
    try{
        console.log('trying to publish')
        const connection = await amqp.connect("amqps://hhlzklho:p7RP8QipZIZ3zXGgzJKZDxgQ_EfOYbST@chimpanzee.rmq.cloudamqp.com/hhlzklho");
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