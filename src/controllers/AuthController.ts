import { Request, Response } from "express";
import IController from "./ControllerInterface";



class AuthController implements IController{
    index(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }
    create(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }
    show(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Response {
        throw new Error("Method not implemented.");
    }    

    
}

export default new AuthController();