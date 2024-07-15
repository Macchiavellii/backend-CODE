const express = require('express');
const cluster = require('cluster')
const numCPUs =require('os').cpus().length
const userRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route')
//const bookRouter = require('./routes/book.route');
const app = express();

app.use(express.json());

if (cluster.isMaster) {
    console.log('Master' + process.pid + 'is running!')

    //fork worker processes
    for(let i = 0; i< numCPUs; i++){
        cluster.fork()
    }
    cluster.on(
        'exit',
        (worker,code,signal) => {
            console.log('Worker' + worker.process.pid + 'died')
            cluster.fork()
        } 
    )
}
else{
    app.get('/',(req,res) => { res.send('Hello from worker' + process.pid) })
    app.listen(3000,() => {console.log('Worker' + process.pid + 'started')})
}

const sequelize = require('./config/database');
const User = require('./models/userModel');
User.sync({ force: true }).then(() => {
console.log('User Table syncronized!');
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
    });
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter)
//app.use('/api/book', bookRouter);

app.get('/', (req, resp) => {
    resp.send({message: 'API di root ( / ) non implementata!'})
});

module.exports = app;