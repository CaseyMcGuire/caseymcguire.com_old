import * as express from "express";
import * as expressHandlebars from "express-handlebars";
import configureRoutes from "./config/routes";
import * as cookieParser from "cookie-parser";
import * as passport from "passport";
import * as csrf from "csurf";
import configurePassport from "./config/passport";

const app = express();
const csrfProtection: express.RequestHandler = csrf({ cookie: true });

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

// adds a 'cookie' field to the Request object
app.use(cookieParser());
app.use(csrfProtection);


configurePassport(app, passport);
configureRoutes(app, passport);

app.listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))