import { apodRouter } from "../Routes/apod.route.js";
import { asteroidRouter } from "../Routes/asteroid.route.js";
import { donkiRouter } from "../Routes/donki.route.js";
import { earthImageryRouter } from "../Routes/earthimagery.route.js";
import { marsRoverRouter } from "../Routes/marsRover.route.js";
import { exoplanetRouter } from "../Routes/exoPlanet.route.js";
import { eonetRouter } from "../Routes/eonet.route.js";
import { epicRouter } from "../Routes/epic.router.js";
import { nasaImageRouter } from "../Routes/nasaImagery.route.js";
import { marsWeatherRouter } from "../Routes/marsWaether.route.js";
import { neoWsRouter } from "../Routes/neo.route.js";

class RoutesLoader {
    static initRoutes(app, version) {

        app.use(`/api/${version}/apod`, apodRouter);
        app.use(`/api/${version}/asteroid`, asteroidRouter);
        app.use(`/api/${version}/donki`, donkiRouter);
        app.use(`/api/${version}/earthimagery`, earthImageryRouter);
        app.use(`/api/${version}/marsRover`, marsRoverRouter);
        app.use(`/api/${version}/exoplanets`, exoplanetRouter);
        app.use(`/api/${version}/eonet`, eonetRouter);
        app.use(`/api/${version}/epic`, epicRouter);
        app.use(`/api/${version}/nasaImage`, nasaImageRouter);
        app.use(`/api/${version}/mars-weather`, marsWeatherRouter);
        app.use(`/api/${version}/neo`, neoWsRouter);
            
    }        
    
}

export { RoutesLoader };
