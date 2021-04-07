const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const rootDir = require('./helpers/path');

const adminRoutes = require('./routes/admin');

const userViewRouter = require('./routes/userView');
// const handleBrs = require('express-handlebars')  Needed if you want to use handlebars template

const app = express();
// .set is like a setter method.  It sets the (name, value) which you can access with app.get(name).
// app.set('view engine', 'pug');  Tells express to use Pug.  Pug is a submodule of express. Express knows Pug which is why we don't have to require it.
// app.engine('handlebars', handleBrs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout'})); This registers our handlebars template engine you use.  First argument is whatever you want. The object passed into handlebars is needed if using layouts.
// app.set('view engine', 'handlebars');  Used for handlebars, tells the view engine we are using handlebars.  Secondar argument must match first in line 14.
app.set('views', 'views'); // Explicitly tells Pug/ejs what folder to look into for our templates
app.set('view engine', 'ejs'); // This comes with express and works right out of the box like Pug, so no need to register it like we do with handlebars
// Lines 9, 14 and 15 are needed to use handlebars as our template. 
// Lines 13 and 16 are used if you want to use Pug.
// Lines 16 ad 17 are used if you want to use ejs.

const errorController = require('./controllers/404');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// Line 24 is needed to set the path for our links.  This tells express to start in 'public' 
// and then go deeper.  So <link rel="stylesheet" href="/css/main.css" for example.  The 
// normal way of creating the path won't work. We have to forward file requests to this 'public' folder.
app.use('/admin', adminRoutes);
// Looks and checks if route starts with /admin, then looks into the adminData.routes file
app.use(userViewRouter);
app.use(errorController.get404Page);
// First arguement in render is the name of the file to render, the second is the object made available
// your dynamic rendering like embedded ruby.
app.listen(3000);