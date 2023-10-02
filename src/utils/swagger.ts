import { Express,Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options:swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Video Upload API',
            version: '1.0.0',
            description: 'A simple Express Video Upload API',
        },
        // servers: [
        //     {
        //         url: 'https://upload-video-api.onrender.com/',
        //     },
        // ],
    },
    apis: ['./src/routes/*.ts'],
}

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app:Express, port:number){
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req:Request, res:Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

export default swaggerDocs;