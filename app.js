const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(require('./routes'));

app.listen(5000, () =>{
    console.log('Pair Project Edutech');
});