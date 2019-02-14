#!/bin/env/node
const UDPClient = require('./UDPClient');
global.config = require('./config.json');
global.env = config[config.production ? "prod" : "dev"];

//get parameters 
//param examples: -s 0.0.0.0:4000 -k 10 -i 1234//-k keep alive in s, -i id to identify the client
let serverPort = null;
let serverIp = null;
let keepAliveTime = null; 
let id = null;

let argSections = process.argv.slice(2, 8).join(' ').split('-').splice(1,4);

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
            keepAliveTime = parseInt(time);
            }
            break;

        case 'i':{
            id = item.split('i')[1].replace(/\s/g, '');
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
id = id ? id : global.config.id;
// init
new UDPClient(serverPort, serverIp, keepAliveTime, id).start();

console.log(`INFO: Client ${id} started`);

