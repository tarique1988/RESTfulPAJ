const http = require('http');
const app = require('./app')

const server = http.createServer(app);
server.listen(process.env.PORT || 30003, ()=>{
    console.log("Server is running...")
});