const express = require('express');
const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const app = express();

const sequelize = require('./config/database');
const User = require('./models/userModel');
User.sync({ force: true }).then(() => {
console.log('User Table syncronized!');
});
sequelize.sync({ force: true }).then(() => {
console.log('Database & tables created!');
});

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);

app.get('/', (req,resp) => {
    resp.send({message: 'API di root ( / ) non implementata!'})
});

module.exports = app;
