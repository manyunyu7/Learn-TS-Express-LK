import express, {
    Application, Request, Response
} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression"; //
import cors from "cors";
import helmet from "helmet";

class App{
    public app:Application;

    constructor(){
        this.app=express();
        this.plugins();
        this.routes();
    }

    protected plugins() : void{
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression()); // enable gzip compression
        this.app.use(cors());
        this.app.use(helmet());
    }

    protected routes() : void{
        this.app.route("/").get((req:Request, res:Response) => {
            res.send("Hello World!");
        });


        this.app.route("/login").get((req:Request, res:Response) => {
            res.send("Login Page");
        });

        this.app.route("/coba-lagi-ah").post((req:Request, res:Response) => {
            console.log(req.body);
            res.send(req.body);
        });

        //route to hit certain api 200 times paralelly on the same time
        
        

        this.app.route("/as-you-wish").get((req:Request, res:Response) => {
            const requestData = {
                query: req.query,
                params: req.params,
                body: req.body,
                headers: req.headers,
              };
              res.json(requestData);
        });


        //route than define api spesification and version in well structured json
        this.app.route("/api").get((req:Request, res:Response) => {
            const api = {
                name: "My API",
                version: "1.0.0",
                description: "My API description"
            };
            res.send(api);
        });

        //route that return list of users in arrays
        this.app.route("/users").get((req:Request, res:Response) => {
            const users = [
                {id:1, name:"John"},
                {id:2, name:"Jane"},
                {id:3, name:"Bob"},
                {id:4, name:"Alice"},
                {id:4, name:"Su"},
                {id:444,name:"Jokowi"},
                {id:4, name:"Subhan"}, 
                {id:4, name:"   qsss"}, 
            ];
            res.send(users);
        });
    }
}


const port:number = 8000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});