import { Request, Response, NextFunction } from "express";
import { CustomError } from "./customErrors";
export function errorMiddleWave(err:CustomError, req:Request, res:Response, next:NextFunction){
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    res.status(statusCode).json({
        message:err.message
    })
}