require("dotenv").config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./modules/dbConnect');
const app = express();
app.use(cors({origin:'*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

console.log(process.env.DATABASE_USER);

app.post('/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        console.log(row);
        res.status(200).json('success');
    })
})

app.listen(3000,()=>{
    console.log('server start!')
})
