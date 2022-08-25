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

app.post('/api/conectLog', (req, res) =>{
    db.setData('conectLog', 'insertConectLog', req.body)
    .then(function(row) {
        console.log(row);
        res.status(200).json('success');
    })
})

app.listen(8000,()=>{
    console.log('server start!')
})
