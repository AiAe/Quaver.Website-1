import express from "express";
import Router from "./router/Router";
import path from "path";
import Logger from "./logging/Logger";
import Login from "./controllers/login/Login";
import Purge from "./Purge";

const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./config/config.json");
const twig = require("twig");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const cookieParser = require('cookie-parser');
const redis = require('redis');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const bearerToken = require('express-bearer-token');

const client = redis.createClient({
    password: config.redis.password,
    port: config.redis.port,
    host: config.redis.host,
    db: 5
});

export default class Server {
    /**
     * The port the server will run on
     */
    public Port: Number;

    /**
     * The express server
     */
    public ExpressApp: express.Application;

    /**
     * @param port
     */
    constructor(port: number) {
        this.Port = port;
        this.ExpressApp = express();

        this.InitializeServer();
    }

    /**
     * Initializes and runs the server.
     * @constructor
     */
    private InitializeServer(): void {
        // Purge CSS
        Purge.PurgeCSS();

        this.ExpressApp.set("views", path.join(__dirname, "../src/views"));
        this.ExpressApp.set("twig options", {
            allow_async: true
        });

        this.ExpressApp.set("view engine", "twig");
        this.ExpressApp.set("view options", {layout: false});

        this.ExpressApp.use(cookieParser());
        this.ExpressApp.use(bearerToken());

        if (config.environment === "development") {
            // Disable twig cache
            twig.cache(false);
            // Allow static to be accessed only in development mode
            this.ExpressApp.use(express.static(path.join(__dirname, "../src/static")));
        }

        this.ExpressApp.use(bodyParser.json());
        this.ExpressApp.use(bodyParser.urlencoded({extended: true}));

        this.ExpressApp.use(fileUpload({
            safeFileNames: true,
            preserveExtension: true
        }));

        this.ExpressApp.use(require('express-session')({
            store: new RedisStore({client: client, prefix: config.expressSessionPrefixRedis, ttl: 43200}),
            secret: config.expressSessionSecret,
            name: 'quaver_session',
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: false,
                maxAge: (24 * 60 * 60 * 1000) * 30
            }
        }));

        this.ExpressApp.use(flash());

        Login.Initialize();
        Login.ConfigurePassport();

        this.ExpressApp.use(passport.initialize());
        this.ExpressApp.use(passport.session());

        this.ExpressApp.disable('x-powered-by');

        this.ExpressApp.use("/", Router.InitializeRouter(this.ExpressApp));
        this.ExpressApp.listen(this.Port, () => Logger.Success(`Quaver.Website server has started on port: ${config.port}`));
    }
}
