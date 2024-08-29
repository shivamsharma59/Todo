const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
require('dotenv').config();
const cookieParser = require('cookie-parser');

// configure ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./backend/views"));

// middlewares
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));


// parse the request body and populates it in the req.body
app.use(express.urlencoded({ extended: true })); // currently using for form data 
app.use(bodyParser.json());
app.use(cookieParser());


// Routes 
const apiTaskRoutes = require('./routes/apiTask.js');
const indexRoutes = require('./routes/indexRoutes.js');
const { isAuthorized } = require('./middleware/jwtAuth.js');

app.use('/', indexRoutes);
app.use('/api', isAuthorized, apiTaskRoutes)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT no : ${PORT}`);
})


