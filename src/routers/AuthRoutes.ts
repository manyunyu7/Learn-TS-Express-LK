import BaseRoutes from "./BaseRouter";

import AuthController from "../controllers/AuthController";
import validate from "../middlewares/AuthValidator";

class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/login", AuthController.login);
        this.router.get('/tasks', AuthController.executeTasks);
        this.router.post("/register",validate,AuthController.register);
    }
}

export default AuthRoutes;