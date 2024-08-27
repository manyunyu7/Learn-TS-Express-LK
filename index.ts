import express, {
    Application, Request, Response
} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression"; //
import cors from "cors";
import helmet from "helmet";

//Routes;
import UserRoutes from "./src/routers/UserRoutes";
import AuthRoutes from "./src/routers/AuthRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression()); // enable gzip compression
        this.app.use(cors());
        this.app.use(helmet());
    }

    protected routes(): void {

        this.app.use("/api/v1/auth/",  AuthRoutes.router);
        this.app.use("/api/v1/users/", new UserRoutes().router);

        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Hello World!");
        });

        this.app.route("/login").get((req: Request, res: Response) => {
            res.send("Login Page");
        });

        this.app.route("/coba-lagi-ah").post((req: Request, res: Response) => {
            console.log(req.body);
            res.send(req.body);
        });

        // Define a route to print all routes
        this.app.route('/doc').get((req: Request, res: Response) => {
            const routes: any[] = [];
            app._router.stack.forEach((middleware: any) => {
                if (middleware.route) {
                    // If it's a route
                    Object.keys(middleware.route.methods).forEach((method) => {
                        routes.push({
                            method: method.toUpperCase(),
                            path: middleware.route.path
                        });
                    });
                } else if (middleware.name === 'router') {
                    // If it's a router
                    middleware.handle.stack.forEach((handler: any) => {
                        if (handler.route) {
                            Object.keys(handler.route.methods).forEach((method) => {
                                routes.push({
                                    method: method.toUpperCase(),
                                    path: handler.route.path
                                });
                            });
                        }
                    });
                }
            });

            res.json(routes);
        });

        this.app.route("/as-you-wish").get((req: Request, res: Response) => {
            const requestData = {
                query: req.query,
                params: req.params,
                body: req.body,
                headers: req.headers,
            };
            res.json(requestData);
        });




        //route than define api spesification and version in well structured json
        this.app.route("/api").get((req: Request, res: Response) => {
            const api = {
                name: "My API",
                version: "1.0.0",
                description: "My API description"
            };
            res.send(api);
        });
    }
}


const port: number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});