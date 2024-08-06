import {Router,Request,Response} from "express";
import IRouter from "./RouteInterface";


class UserRoutes implements IRouter{
    public router:Router;


    constructor(){
        this.router = Router();
        this.routes();
    }


    routes(): void {
        //new endpoint without arrow function
        this.router.get("/users",(req:Request, res:Response) => {
            res.send("ini adalah endpoint index user");
        });
    }
}

export default UserRoutes;