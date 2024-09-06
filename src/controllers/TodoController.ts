import { Request, Response } from "express";
import { flushResponse } from "../helper/response_helper";
import IController from "./ControllerInterface";

const db = require('../db/models');

class TodoController implements IController {

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const query = `
            SELECT todos.*, users.username, users.nickname 
            FROM todos 
            LEFT JOIN users ON todos.user_id = users.id
          `;

            const todos = await db.sequelize.query(query, { type: db.Sequelize.QueryTypes.SELECT });

            return res.send(flushResponse(200, "Todos fetched successfully", todos));
        } catch (error) {
            return res.status(500).send(flushResponse(500, "Error fetching todos", error));
        }
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

    async show(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const query: string = `SELECT * FROM todos WHERE id = ?`;
        const result = await db.sequelize.query(query,
            {
                replacements: [id], type: db.Sequelize.QueryTypes.SELECT
            }
        );
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