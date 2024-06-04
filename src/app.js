const express = require('express');
const foodRouter = require('./routes/user.route');

const app = express();

app.use(express.json());

app.use('/api/user', foodRouter);

app.get('/', (req,resp) => {
    console.log('kjsnfk')  
    resp.send({message: 'API di root ( / ) non implementata!'})
});

module.exports = app;
