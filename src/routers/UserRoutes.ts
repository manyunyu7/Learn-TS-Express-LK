import { Router, Request, Response } from "express";
import BaseRoutes from "./BaseRouter";

//routes 
import UserController from "../controllers/UserController";


//middleware
import { authMiddleware } from "../middlewares/AuthMiddleware";

class UserRoutes extends BaseRoutes {
    routes(): void {

        this.router.get("/",authMiddleware,UserController.index);
        this.router.post("/create", UserController.create);
        this.router.get("/:id", UserController.show);
        this.router.put("/:id", UserController.update);
        this.router.delete("/users/:id", UserController.delete);

        //example endpoint without arrow function
        this.router.get("/users", (req: Request, res: Response) => {
            res.send("ini adalah endpoint index user");
        });

        this.router.get("something", (req: Request, res: Response) =>
            res.send("ini adalah endpoint lain"));
    }
}

export default UserRoutes;