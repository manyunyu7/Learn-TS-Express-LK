import {Router,Request,Response} from 'express';
import BaseRoutes from './BaseRouter';

import AuthController from '../controllers/AuthController';

class AuthRoutes extends BaseRoutes {

    routes(): void {

        this.router.get("/", AuthController.index);
        this.router.post("/create", AuthController.create);
        this.router.get("/:id", AuthController.show);
        this.router.put("/:id", AuthController.update);
        this.router.delete("/users/:id", AuthController.delete);

        //example endpoint without arrow function
        this.router.get("/users", (req: Request, res: Response) => {
            res.send("ini adalah endpoint index user");
        });

        this.router.get("something", (req: Request, res: Response) =>
            res.send("ini adalah endpoint lain"));
    }

}

export default new AuthRoutes();