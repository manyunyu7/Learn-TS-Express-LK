import { Request, Response } from "express";
import { flushResponse } from "../helper/response_helper";
import PasswordHash from "../helper/PasswordHash";
const db = require('../db/models');


class AuthController {

    printSomething(): void {
        console.log('Printing something...');
    }

    //login method with jwt
    async login(req: Request, res: Response): Promise<Response> {
        let username = req.body.username;
        let password = req.body.password;


        // check if username and password are provided
        if (!username || !password) {
            return res.send(flushResponse(400, "Username and password are required", null));
        }

        // check if username and password are correct
        let user = await db.user.findOne({ where: { username: username } });
        if (!user) {
            return res.send(flushResponse(400, "Username or password is incorrect", null));
        }

        // check if password is correct
        let isPasswordValid = await PasswordHash.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.send(flushResponse(400, "Username or password is incorrect", null));
        }

        //destructure user and remove password from user object
        const { password: _, ...userWithoutPassword } = user.dataValues;

        // Generate a JSON Web Token (JWT) for the authenticated user
        let token = PasswordHash.generateToken(user.id, user.username);
        return res.send(flushResponse(200, "Login successful", { user: userWithoutPassword, token: token }));
    }

    async profile(req: Request, res: Response): Promise<Response> {
        return res.status(201).send(flushResponse(200, "Profile data", req.app.get("user")));
    }

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
            return res.send(flushResponse(400, "Username and password are required", null));
        }

        if (username.length < 5 || password.length < 8) {
            return res.send(flushResponse(400, "Username and password must be at least 5 characters and 8 characters long", null));
        }

        let encryptedPassword = await PasswordHash.hashPassword(password);

        // Check if a user with the same username already exists
        let existingUser = await db.user.findOne({ where: { username: username } });
        if (existingUser) {
            return res.send(flushResponse(400, "A user with the same username already exists", null));
        }

        res.status(201); // Created status code


        // Create a new user in the database
        let user = await db.user.create({
            username: username,
            password: encryptedPassword
        });

        user.nickname = "";
        return res.send(flushResponse(200, "User created successfully", user));

    }

    // Example function that represents a task
    async performTask(taskId: number): Promise<void> {
        // Simulating some asynchronous task
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        console.log(`Task ${taskId} completed.`);
    }

    async executeTasks(req: Request, res: Response): Promise<void> {
        const tasksCount = 10000;
        const tasks = [];

        // Creating an array of promises representing each task
        for (let i = 0; i < tasksCount; i++) {
            tasks.push(this.performTask.bind(this, i)()); // Bind `this` to maintain context
        }

        try {
            // Execute all tasks concurrently
            await Promise.all(tasks);
            res.status(200).json({ message: `${tasksCount} tasks executed successfully.` });
        } catch (error) {
            console.error('Error executing tasks:', error);
            res.status(500).json({ error: 'Failed to execute tasks.' });
        }
    }
}

export default new AuthController();