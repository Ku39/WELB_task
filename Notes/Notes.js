const express = require('express');
const router = require('./Notes_router')

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/notes", router);

const start = () => {
    try{
        app.listen(PORT, () => console.log("Server is active"));
    }catch(err){
        console.log(err);
    }
}

start();
