#!/bin/env/node
const UDPClient = require('./UDPClient');
const UDPStreamer = require('./UDPStreamer');
const SelfQueue = require('./SelfQueue');

const config = require('./config.json');
const env = config[config.production ? "prod" : "dev"];

//get parameters 
//param examples: -s 0.0.0.0:4000 -c 0.0.0.0:5000 -t 500  
let streamPort = null;
let streamIp = null;
let clientPort = null;
let clientIp = null;
let cacheTime = null; 

let argSections = process.argv.slice(2, 8).join(' ').split('-').splice(1,4);

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

        default:
            break;

    }
});

// check
streamPort = streamPort ? streamPort : env.streamer.port;
streamIp = streamIp ? streamIp :  env.streamer.address;
clientPort = clientPort ? clientPort : env.client.port;
clientIp = clientIp ? clientIp : env.client.address;
cacheTime = cacheTime ? cacheTime: env.cacheTime; 

// init
SelfQueue.setWtime(cacheTime);
new UDPClient(clientPort, clientIp).start();
new UDPStreamer(streamPort, streamIp).start();

console.log("INFO: Tunnel started");

