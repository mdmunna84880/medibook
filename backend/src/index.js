const app = require('./app');
const connectToDB = require('./config/db');
const env = require("./config/env");
const dns = require("dns");

// Setting dns to this specific so that it don't break while connecting to MONGODB
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connecting Database(MongoDB)
connectToDB();

// Starting the server
app.listen(env.PORT, ()=>{
    console.log(`\n${new Date().toLocaleTimeString()}  ${new Date().toLocaleDateString()},`,"server is running on Port: ", env.PORT);
})