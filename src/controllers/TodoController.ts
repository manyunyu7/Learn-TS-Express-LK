import { Request, Response } from "express";
import { flushResponse } from "../helper/response_helper";
import IController from "./ControllerInterface";
import Siquel from "../helper/siquel/Siquel";
const db = require('../db/models');

class TodoController implements IController {
    async index(req: Request, res: Response): Promise<Response> {
        try {
            const searchQuery = req.query.q as string;

            let result = new Siquel(db.sequelize, 'todos')
                .select(['todos.id', 'description', 'user_id'])
                .leftJoin('users', 'todos.user_id = user.id', 'user')
                .where('todos.user_id', '=', req.app.locals.credentials.id);

            if (searchQuery) {
                result.where('user.username LIKE :searchQuery OR user.nickname LIKE :searchQuery', `%${searchQuery}%`);
            }

            const todos = await result.execute();

            return res.send(flushResponse(200, "Todos fetched successfully", todos));
        } catch (error) {
            console.error(error);
            return res.status(500).send(flushResponse(500, "Error fetching todos", error));
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        let description: string = req.body.description;
        let userId: number = req.app.locals.credentials.id

        const result = new Siquel(db.sequelize, 'todos')
            .insert({
                description: description,
                user_id: userId,
            });

        console.log("Info Info Masseh");
        console.log("User ID: ", userId);

        var todo = await result.execute();


        if (todo) {
            return res.send(flushResponse(200, "Todo created successfully", todo));
        } else {
            return res.status(400).send(flushResponse(400, "Failed to create Todo", null));
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const result = await new Siquel(db.sequelize, 'todos')
            .select(['todos.id', 'description', 'user_id'])
            .leftJoin('users', 'todos.user_id = user.id', 'user')
            .where('todos.id', '=', id)
            .execute();

        return res.send(flushResponse(200, "Todo fetched successfully", result));
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id);
        const description: string = req.body.description;
        const userId: number = req.app.locals.credentials.id;

        const todo = db.todo.update({
            description: description,
            user_id: userId
        }, {
            where: {
                id: id
            }
        });

        if (todo) {
            return res.send(flushResponse(200, "Todo updated successfully", null));
        } else {
            return res.status(404).send(flushResponse(404, "Todo not found", null));
        }
    }


    async delete(req: Request, res: Response): Promise<Response> {
        const id: number = parseInt(req.params.id);
        const todo = db.todo.destroy({
            where: {
                id: id
            }
        });

        if (todo) {
            return res.send(flushResponse(200, "Todo deleted successfully", null));
        } else {
            return res.status(404).send(flushResponse(404, "Todo not found", null));
        }
    }


}

export default new TodoController();