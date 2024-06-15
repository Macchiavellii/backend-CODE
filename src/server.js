const config = require('./config/config');
const app = require('./app');

const port = config.serverPort || 3000;
app.listen(port, console.log(`App listening in port ${port}`));