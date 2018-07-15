import * as express from "express";
const app = express();
const expressHandlebars = require('express-handlebars');

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/../client'));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('main');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))