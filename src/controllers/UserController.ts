import { Request, Response } from "express";
import IController from "./ControllerInterface";

//object class user to save user data
class User {
    id: number;
    name: string;
    email: string;
    isDeleted: boolean;

    constructor(options: UserOptions) {
        this.id = options.id;
        this.isDeleted = options.isDeleted ?? false; // Default value of false
        this.name = options.name;
        this.email = options.email;
    }
}

interface UserOptions {
    id: number;
    isDeleted?: boolean;
    name: string;
    email: string;
}

//array to represent dummy user data objects
let data: User[] = [
    new User({ id: 1, name: "John Doe", email: "john.doe@example.com" }),
    new User({ id: 2, name: "Jane Doe", email: "jane.doe@example.com" }),
    new User({ id: 3, name: "Bob Johnson", email: "bob.johnson@example.com" }),
    new User({ id: 4, name: "Joko Wibowo", email: "joko.wibowo@example.com" }),
];


class UserController implements IController {
    index(req: Request, res: Response): Response {
        
        //filters = 
        let users = data.filter((user: User) =>!user.isDeleted);


        return res.json(users);
        //return res.send("ini adalah controller index user");
    }
    create(req: Request, res: Response): Response {

        var name: string = req.body.name;
        var email: string = req.body.email;

        //validate request field
        if (!name || !email) {
            return res.status(400).json({ error: "Name and Email are required." });
        }

        //check if email already exists
        var isEmailExist: boolean = false;
        data.forEach((user: User) => {
            if (user.email === email) {
                isEmailExist = true;
                return; // Use return instead of break to fix the error
            }
        });

        if (isEmailExist) {
            return res.status(400).json({ error: "Email already exists." });
        }

        //validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        //save new user data to the array
        //id will be incremented automatically since it's a new user
        //data.push({id: data.length + 1, name: name, email: email});
        //but since we want to simulate real-world scenario, let's use the id from the request body instead
        //assuming that id is always provided in the request body when creating a new user
        //if id is not provided, we'll assume it's a new user and increment the id from the last

        data.push(new User({ id: data.length + 1, name: name, email: email }));

        //return well formatted JSON response
        return res.status(201).json(data[data.length - 1]);
    }
    show(req: Request, res: Response): Response {
        //declare nullable user variable
        var user: User | null = null;
        data.forEach((u: User) => {
            if (u.id === parseInt(req.params.id)) {
                user = u;
                return; // Use return instead of break to fix the error
            }
        });

        if (user != null) {
            return res.json(user);
        } else {
            return res.status(404).json({ error: "User not found." });
        }
    }
    update(req: Request, res: Response): Response {
        //find user with given id
        let id: number = parseInt(req.params.id);

        //find user within the array
        var user: User | null = null;

        user = data.find((u: User) => {
            return u.id == id;
        }) || null;




        if (user == null) {
            return res.status(400).json({ error: "User not found.", user: user });
        }

        if (user != null) {


            //check if the email has been used by another user
            let isEmailExist: boolean = data.some((u: User) => {
                return u.id != id && u.email === req.body.email;
            });

            if (isEmailExist) {
                return res.status(400).json({ error: "Email already exists." });
            }

            //update user data
            user.name = req.body.name || user!.name;
            user.email = req.body.email || user!.email;
        }

        //return well formatted JSON response
        return res.json(user);
    }


    delete(req: Request, res: Response): Response {

        let userId = parseInt(req.params.id);

        //find user with given id
        let user: User | null = data.find((u: User) => {
            return u.id === userId;
        }) || null;


        if (user == null) {
            return res.status(400).json({ error: "User not found.", user: user });
        }else{
            user.isDeleted=true;
        }


        return res.send("ini adalah controller delete user");
    }

}

export default new UserController();