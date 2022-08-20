const express = require('express');
const authrouter = require('./Router.js')

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authrouter);

const start = () => {
    try{
        app.listen(PORT, () => console.log("Server is active"));
    }catch(err){
        console.log(err);
    }
}

start();