#!/bin/env/node
const UDPClient = require('./UDPCliServer');
const UDPStreamer = require('./UDPStrServer');
const SelfQueue = require('./SelfQueue');

const config = require('./config.json');
global.env = config[config.production ? "prod" : "dev"];

//get parameters 
//param examples: -s 0.0.0.0:4000 -c 0.0.0.0:5000 -t 500 -e 100
let streamPort = null;
let streamIp = null;
let clientPort = null;
let clientIp = null;
let cacheTime = null; 
let sendTime = null;

let argSections = process.argv.slice(2, 10).join(' ').split('-').splice(1,5);

argSections.forEach((item)=>{

    switch(item[0]){
        case 's':{
            let endpoint = (item.split('s')[1]).replace(/\s/g, '').split(':');
            streamPort = endpoint[1];
            streamIp = endpoint[0]; 
            }   
            break;
        
        case 'c':{
            let endpoint = (item.split('c')[1]).replace(/\s/g, '').split(':');
            clientPort = endpoint[1];
            clientIp = endpoint[0]; 
            }
            break;

        case 't':{
            let time = item.split('t')[1];
            cacheTime = parseInt(time);
            }
            break;

        case 'e':{
            let time = item.split('e')[1];
            sendTime = parseInt(time);
            }
            break;

        default:
            break;

    }
});

// check
streamPort = streamPort ? streamPort : env.streamer.port;
streamIp = streamIp ? streamIp :  env.streamer.address;
clientPort = clientPort ? clientPort : env.client.port;
clientIp = clientIp ? clientIp : env.client.address;
cacheTime = cacheTime ? cacheTime : config.cacheTime; 
sendTime = sendTime ? sendTime : env.client.sendTime
// init
SelfQueue.setWtime(cacheTime);
new UDPClient(clientPort, clientIp, sendTime).start();
new UDPStreamer(streamPort, streamIp).start();

console.log("INFO: Tunnel started");

