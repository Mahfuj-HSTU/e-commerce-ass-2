// const express = require('express');
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlwares/globalErrorhandler';
import router from './app/routes';
import notFound from './app/middlwares/notFound';
const app: Application = express();

//* parsers
app.use(express.json());
app.use(cors());

//* application routes
app.use('/api/v1', router);

const getController = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getController);

app.use(globalErrorHandler);

// * Not Found
app.use(notFound);

export default app;
