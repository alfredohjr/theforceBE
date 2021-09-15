import { NextFunction, Request, Response } from 'express';
import * as Sentry from "@sentry/node";

import sentryConfig from '../config/sentry';
import AppError from '../errors/AppError';



async function ErrorMiddleware(err: Error, request: Request, response: Response, next: NextFunction) {
    
    
    
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        })
    }
    
    console.log(new Date(),'new AppError found',err);
    Sentry.init(sentryConfig);
    Sentry.captureException(err);
    
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.',
    })
}

export default ErrorMiddleware;