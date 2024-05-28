const express = require('express');
const db = require('./config/database'); // Ensure this file exists and exports the correct database instance
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');


// Router
const userRoutes = require("./routes/user_routes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use("/api/v1/auth", userRoutes)


//sync database
db
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    })
    .catch(err => console.log(err));


