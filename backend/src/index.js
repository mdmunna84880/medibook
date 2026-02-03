const app = require('./app');
const connectToDB = require('./config/db');
const env = require("./config/env");

// DNS so that MONGO can connect
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectToDB();

app.listen(env.PORT, ()=>{
    console.log("Server is running on Port: ", env.PORT);
})