import BaseRoutes from "./BaseRouter";

import AuthController from "../controllers/AuthController";

class AuthRoutes extends BaseRoutes {
    routes(): void {
        this.router.post("/register",AuthController.register);
    }
}

export default AuthRoutes;