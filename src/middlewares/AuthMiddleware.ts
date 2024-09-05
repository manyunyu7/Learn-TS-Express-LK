import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    // return response 
    // res.status(401).json({ message: 'Unauthorized' });
    next();
}