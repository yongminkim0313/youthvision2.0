require("dotenv").config();
var path = require('path');
const express = require('express')
const cors = require('cors')
const db = require('./modules/dbConnect');
const app = express();
app.use(cors({origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


console.log(process.env.DATABASE_USER);
db.test();

app.post('/api/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        console.log(row);
        res.status(200).json('success');
    })
    .catch(err=>{
        res.status(400).json(Error(err))
    })
})

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`server start! port:${process.env.SERVER_PORT}`)
})
