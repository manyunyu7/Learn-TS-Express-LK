import { Request, Response } from "express";
import { responseSuccess } from "../helper/response_helper";
import PasswordHash from "../helper/PasswordHash";
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

        let encryptedPassword = await PasswordHash.hashPassword(password);

        // Check if a user with the same username already exists
        let existingUser = await db.user.findOne({ where: { username: username } });
        if (existingUser) {
            return res.send(responseSuccess(400, "A user with the same username already exists", null));
        }

        res.status(201); // Created status code


        // Create a new user in the database
        let user = await db.user.create({
            username: username,
            password: encryptedPassword
        });

        user.nickname = "";
        return res.send(responseSuccess(200, "User created successfully", user));

    }
}

export default new AuthController();