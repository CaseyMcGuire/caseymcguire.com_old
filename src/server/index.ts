import * as express from "express";
const app = express();
const expressHandlebars = require('express-handlebars');
import configureRoutes from "./config/routes";

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/../public'));

configureRoutes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))