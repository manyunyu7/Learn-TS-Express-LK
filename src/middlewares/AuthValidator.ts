import {Request, Response, NextFunction } from 'express';
import {check, validationResult } from 'express-validator';
import { responseSuccess } from '../helper/response_helper';



const validate = [
    check('username').notEmpty().withMessage('Username perlu diisi'),
    check('password').notEmpty().withMessage('Password perlu diisi'),
    //nickname is allowed to be empty, but if provided, it should be at least 3 characters long
    check('nickname').optional().isLength({ min: 3 }).withMessage('Nickname minimal 3 karakter'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Summarize all error messages into a single string
            const errorMessages = errors.array().map(err => err.msg).join(', ');

            // Send response with summarized error message in Bahasa Indonesia
            return res.status(400).send(responseSuccess(400, `Validasi gagal: ${errorMessages}`, null));
        }
        next();
    }
];

export default validate;