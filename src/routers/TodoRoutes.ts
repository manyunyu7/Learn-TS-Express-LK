import BaseRoutes from "./BaseRouter";

import { authMiddleware } from "../middlewares/AuthMiddleware";
import TodoController from "../controllers/TodoController";
import validateTodo from "../middlewares/TodoValidator";

class TodoRoutes extends BaseRoutes {
    routes(): void {
        this.router.get("/", authMiddleware, TodoController.index);
        this.router.post("/create", authMiddleware, validateTodo, TodoController.create);
        this.router.get("/:id", authMiddleware, TodoController.show);
        this.router.put("/:id", authMiddleware, validateTodo, TodoController.update);
        this.router.delete("/users/:id", authMiddleware, validateTodo, TodoController.delete);
    }
}

export default TodoRoutes;