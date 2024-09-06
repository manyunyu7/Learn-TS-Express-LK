import { Request, Response } from "express";
import { flushResponse } from "../helper/response_helper";
import PasswordHash from "../helper/PasswordHash";
import IController from "./ControllerInterface";


const db = require('../db/models');

class TodoController implements IController {


    index(req: Request, res: Response): Promise<Response> {
        throw "";
    }

    async create(req: Request, res: Response): Promise<Response> {
        let description: string = req.body.description;
        let userId: number = req.app.locals.credentials.id

        console.log("Info Info Masseh");
        console.log("User ID: ", userId);

        const todo = await db.todo.create({
            description: description,
            user_id: userId
        });

        if (todo) {
            return res.send(flushResponse(200, "Todo created successfully", todo));
        } else {
            return res.status(400).send(flushResponse(400, "Failed to create Todo", null));
        }
    }


    show(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    update(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }


}

export default new TodoController();