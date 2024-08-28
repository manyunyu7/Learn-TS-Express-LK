import {Router} from 'express';
import IRouter from './RouteInterface';

abstract class BaseRoutes implements IRouter {
    public router: Router;

    constructor(){
        this.router = Router();
        this.routes();
        console.log('UserRoutes constructor called');
    }

    abstract routes(): void;

}

export default BaseRoutes;