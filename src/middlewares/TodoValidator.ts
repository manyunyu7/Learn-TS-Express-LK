import {Request, Response, NextFunction } from 'express';
import {check, validationResult } from 'express-validator';
import { flushResponse } from '../helper/response_helper';


const validateTodo = [
    check('description').notEmpty().withMessage('Deskripsi perlu diisi'),
    //userId cant be empty, taken from middlewares/AuthMiddleware

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Summarize all error messages into a single string
            const errorMessages = errors.array().map(err => err.msg).join(', ');

            // Send response with summarized error message in Bahasa Indonesia
            return res.status(400).send(flushResponse(400, `Validasi gagal: ${errorMessages}`, null));
        }
        return next();
    }
];

export default validateTodo;