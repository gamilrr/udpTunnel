#!/bin/env/node
const UDPStreamer = require('./UDPStreamer');
global.config = require('./config.json');
global.env = config[config.production ? "prod" : "dev"];

//get parameters 
//param examples: -s 0.0.0.0:4000 -k 10 //-k keep alive in s
let serverPort = null;
let serverIp = null;

let keepAliveTime = null; 

let argSections = process.argv.slice(2, 6).join(' ').split('-').splice(1,3);

argSections.forEach((item)=>{

    switch(item[0]){
        case 's':{
            let endpoint = (item.split('s')[1]).replace(/\s/g, '').split(':');
            serverPort = endpoint[1];
            serverIp = endpoint[0]; 
            }   
            break;

        case 't':{
            let time = item.split('t')[1];
            keepAliveTime = parseInt(time);
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
new UDPStreamer(serverPort, serverIp, keepAliveTime).start();

console.log("INFO: Client started");

