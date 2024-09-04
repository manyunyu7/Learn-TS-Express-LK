import { Request, Response } from "express";
import { responseSuccess } from "../helper/response_helper";
const db = require('../db/models');


class AuthController {

    //register method with sequelize
    async register(req: Request, res: Response): Promise<Response> {


        // Extract username and password from the request body
        let username = req.body.username;
        let password = req.body.password;

        // add validation here, like checking if username is unique, password meets complexity requirements, etc.
        // Implement password hashing using bcrypt before storing it in the database.
        // Use try-catch blocks to handle any errors that may occur during database operations.

        // Example validation
        if (!username || !password) {
            return res.send(responseSuccess(400, "Username and password are required", null));
        }

        if (username.length < 5 || password.length < 8) {
            return res.send(responseSuccess(400, "Username and password must be at least 5 characters and 8 characters long", null));
        }

        // Check if a user with the same username already exists
        let existingUser = await db.user.findOne({ where: { username: username } });
        if (existingUser) {
            return res.send(responseSuccess(400, "A user with the same username already exists", null));
        }





        // Create a new user in the database
        let user = await db.user.create({
            username: username,
            password: password
        });

        user.nickname = "asu";
        return res.send(responseSuccess(200, "User created successfully", user));

    }
}

export default new AuthController();