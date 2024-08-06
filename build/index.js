"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        // this.app.use(express.urlencoded({extended: true}))
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Hello World!");
        });
        this.app.route("/login").get((req, res) => {
            res.send("Login Page");
        });
        this.app.route("/coba-lagi-ah").post((req, res) => {
            console.log(req.body);
            res.send(req.body);
        });
        this.app.route("/as-you-wish").get((req, res) => {
            const requestData = {
                query: req.query,
                params: req.params,
                body: req.body,
                headers: req.headers,
            };
            res.json(requestData);
        });
        //route than define api spesification and version in well structured json
        this.app.route("/api").get((req, res) => {
            const api = {
                name: "My API",
                version: "1.0.0",
                description: "My API description"
            };
            res.send(api);
        });
        //route that return list of users in arrays
        this.app.route("/users").get((req, res) => {
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Jane" },
                { id: 3, name: "Bob" },
                { id: 4, name: "Alice" },
                { id: 4, name: "Su" },
                { id: 444, name: "Jokowi" },
                { id: 4, name: "Subhan" },
                { id: 4, name: "   qsss" },
            ];
            res.send(users);
        });
    }
}
const port = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
