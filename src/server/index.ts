import * as express from "express";
import * as expressHandlebars from "express-handlebars";
const app = express();
import configureRoutes from "./config/routes";

app.engine('handlebars', expressHandlebars({
  defaultLayout: "main",
  layoutsDir: __dirname + "/views/layouts"
}));
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/../public'));

// these add a 'body' attribute to the Request object that contains POST data
app.use(express.urlencoded({extended: true}));
app.use(express.json());

configureRoutes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'))