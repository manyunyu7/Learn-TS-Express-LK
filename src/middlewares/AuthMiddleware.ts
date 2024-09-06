import { Request, Response, NextFunction } from 'express';
import { flushResponse } from '../helper/response_helper';
import PasswordHash from '../helper/PasswordHash';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): any => {

    //check if user is authenticated by using jwt
    if (!req.headers.authorization) {
        //send http code
        res.status(401);
        return res.send(flushResponse(401, "Unauthorized, JWT Token must be provided", null,false));
    }

    //check if token is valid
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = PasswordHash.verifyToken(token);

    if (!decodedToken) {
        return res.send(flushResponse(401, "Unauthorized/token expired", null));
    }

    //set user data to request object
    req.app.set("user", decodedToken);
    req.app.locals.credentials = decodedToken;

    //print the locals to check if it's working
    console.log("===== Locals =====");
    console.log(req.app.locals.credentials);
    console.log("below is the user id in locals: ", req.app.locals.credentials.id);
    console.log("===== End Locals =====");


    //call next middleware
    next();
}