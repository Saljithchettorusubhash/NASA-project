import { ExpressLoader } from "./loader/express.loader.js";
import { MiddlewareLoader } from "./loader/middleare.loader.js";
import { RoutesLoader } from "./loader/routes.loader.js";
import { Config } from './Config/Config.js';

// Use the PORT environment variable provided by Render or fall back to 3331 if not set
const port = process.env.PORT || Config.PORT || 3331;  

const app = ExpressLoader.init();
const version = 'v1';
RoutesLoader.initRoutes(app, version);

MiddlewareLoader.init(app);

app.listen(port, () => {
    console.log(`Server started at port ${port} in ${Config.NODE_ENV} mode`);
});
