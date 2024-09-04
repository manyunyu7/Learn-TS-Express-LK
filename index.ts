import express, {
    Application, Request, Response
} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { configDotenv } from "dotenv";

//Routes;
import UserRoutes from "./src/routers/UserRoutes";
import AuthRoutes from "./src/routers/AuthRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        configDotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression()); // enable gzip compression
        this.app.use(cors());
        this.app.use(helmet());
    }

    protected routes(): void {

        this.app.use("/api/v1/users/", new UserRoutes().router);
        this.app.use("/api/v1/auth/", new AuthRoutes().router);
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

export default new App().app;


function print(path: string[], layer: any) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
        console.log('%s /%s',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'));
    }
}

function split(thing: any): string[] | string {
    if (typeof thing === 'string') {
        return thing.split('/');
    } else if (thing.fast_slash) {
        return '';
    } else {
        const match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>';
    }
}

const port: number = 8000;
const app = new App().app;
app._router.stack.forEach(print.bind(null, []))
app.listen(port, () => {
    // Define environment and status symbols
    const environment = process.env.NODE_ENV?.toUpperCase() || 'DEFAULT';
    const symbols: Record<string, string> = {
        DEVELOPMENT: '🔧',
        PRODUCTION: '🚀',
        TESTING: '🧪',
        DEFAULT: '⚙️'
    };
    const statusSymbol = symbols[environment] || symbols.DEFAULT;

    // Define arrays for tidbits and tips
    const tidbits: string[] = [
        'The longest-running TV show is "The Simpsons," which has been airing since 1989. 📺',
        'Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible! 🍯',
        'Octopuses have three hearts and blue blood. 💙🐙',
        'Bananas are berries, but strawberries are not! 🍌🍓'
    ];
    const tips: string[] = [
        'Embrace the challenges and celebrate the small victories. Every bug fixed is a step towards a smoother experience! 🚀',
        'Break down complex problems into smaller, manageable pieces. It’s easier to tackle smaller tasks one at a time. 🧩',
        'Keep your code clean and well-documented. It’s easier to maintain and debug in the long run. 📜',
        'Take regular breaks to avoid burnout. Sometimes a short walk can spark a great idea! 🌿'
    ];

    // Function to select a random item from an array
    const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    // Generate a unique message with different sections
    const currentDateTime = new Date().toLocaleString();

    const asciiArt = `
██╗   ██╗██╗███╗   ██╗ █████╗ ███╗   ██╗███████╗██╗ █████╗      █████╗ ███████╗███████╗███████╗████████╗    ███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗
██║   ██║██║████╗  ██║██╔══██╗████╗  ██║██╔════╝██║██╔══██╗    ██╔══██╗██╔════╝██╔════╝██╔════╝╚══██╔══╝    ████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
██║   ██║██║██╔██╗ ██║███████║██╔██╗ ██║███████╗██║███████║    ███████║███████╗███████╗█████╗     ██║       ██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
╚██╗ ██╔╝██║██║╚██╗██║██╔══██║██║╚██╗██║╚════██║██║██╔══██║    ██╔══██║╚════██║╚════██║██╔══╝     ██║       ██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   
 ╚████╔╝ ██║██║ ╚████║██║  ██║██║ ╚████║███████║██║██║  ██║    ██║  ██║███████║███████║███████╗   ██║       ██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   
  ╚═══╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚═╝  ╚═╝    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝       ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
    `;

    const statusMessage = `
    ************************************************************
    *                                                          *
    *           🎉 Server Status Update! 🎉                    *
    *                                                          *
    *   Environment: ${environment} ${statusSymbol}            *
    *   Port: ${port}                                          *
    *   Date & Time: ${currentDateTime}                        *
    *                                                          *
    *   The server is now live and ready to respond to         *
    *   requests with exceptional efficiency! 🌟               *
    *                                                          *
    *   Here's an interesting tidbit to brighten your day:     *
    *   ${getRandomItem(tidbits)}                               *
    *                                                          *
    *   Tip of the Day:                                         *
    *   ${getRandomItem(tips)}                                  *
    *                                                          *
    *                                                          *
    ************************************************************
    `;

    console.log(statusMessage);
});
