const express = require('express');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const app = express();

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

app.get('/', (req,resp) => {
    resp.send({message: 'API di root ( / ) non implementata!'})
});

module.exports = app;
