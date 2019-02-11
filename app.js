#!/bin/env/node
const UDPClient = require('./UDPClient');
const UDPStreamer = require('./UDPStreamer');

const config = require('./config.json');
const env = config[config.production ? "prod" : "dev"];


new UDPClient(env.client.port, env.client.address).start();
new UDPStreamer(env.streamer.port, env.streamer.address).start();

console.log("INFO: Tunnel started");

