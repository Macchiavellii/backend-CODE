const express = require('express');
const foodRouter = require('./routes/user.route');
console.log('akjshfkjahsfsd')
const app = express();

app.use(express.json());

app.use('/api/user', foodRouter);

app.get('/', (req,resp) => {
    resp.send({message: 'API di root ( / ) non implementata!'})
    console.log('add consolelog')
});

module.exports = app;
