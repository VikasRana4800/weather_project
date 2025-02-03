require('dotenv').config()
let express    = require('express');
let app        = express();  
let path       = require('path');
let port       = process.env.PORT || 3000;
// let cors       = require('cors');
let morgan     = require('morgan');


require('./application/routes/index').init(app);
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use(cors());
app.use(morgan('dev'));
console.log("__dirname===", __dirname+'application/views/login.ejs');
app.set('views', path.join(__dirname, 'application/views'));
app.set('view engine', 'ejs');
let db = require('./application/config/mongodb').init()

globalThis.db = db;
app.listen( port, function (){

    console.log(`Server running on http://localhost:${port}`);
})


