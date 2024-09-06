import BaseRoutes from "./BaseRouter";

import AuthController from "../controllers/AuthController";
import validate from "../middlewares/AuthValidator";
import { authMiddleware } from "../middlewares/AuthMiddleware";

class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/login", AuthController.login);
        this.router.get('/tasks', AuthController.executeTasks);
        this.router.post("/register",validate,AuthController.register);
        this.router.get("/profile", authMiddleware,AuthController.profile);
    }
}

export default AuthRoutes;