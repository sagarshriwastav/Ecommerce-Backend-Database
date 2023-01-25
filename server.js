const express = require('express')
const app = express()
const port = 3000

// ERROR in port setting previously it was set like PORT=3001 but now it sets like "set PORT=3001 && " in frontend package.json

const apiRoutes = require("./routes/apiRoutes")

app.get('/', async (req, res, next) => {
    
    res.json({ message: "API running..." });
})

//MONGODB connection

const connectDB = require("./config/db");
const Product = require('./models/ProductModel')         // Error Nodemon crashed
connectDB();


app.use("/api", apiRoutes);

//To show error message in console , vs code
app.use((error, req, res, next) => {
    console.error(error)
    next(error)
})

//To show error message in web browser
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

