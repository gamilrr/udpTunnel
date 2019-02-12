#!/bin/env/node
const UDPClient = require('./UDPClient');
const config = require('./config.json');
const env = config[config.production ? "prod" : "dev"];

//get parameters 
//param examples: -s 0.0.0.0:4000 -k 10 //-k keep alive in s
let serverPort = null;
let serverIp = null;

let keepAliveTime = null; 

let argSections = process.argv.slice(2, 6).join(' ').split('-');

argSections.splice(2);

argSections.forEach((item)=>{

    switch(item[0]){
        case 's':{
            let endpoint = (item.split('s')[1]).replace(/\s/g, '').split(':');
            serverPort = endpoint[1];
            serverIp = endpoint[0]; 
            }   
            break;

        case 'k':{
            let time = item.split('k')[1];
            keepAliveTime = time;
            }
            break;

        default:
            break;

    }
});

// check
serverPort = serverPort ? serverPort : env.server.port;
serverIp = serverIp ? serverIp :  env.server.address;

keepAliveTime = keepAliveTime ? keepAliveTime: env.keepAliveTime; 

// init
new UDPClient(serverPort, serverIp, keepAliveTime).start();

console.log("INFO: Client started");

