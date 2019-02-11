const dgram = require('dgram');

//abstract class
class UDPSocket{

    constructor(port, address = 'localhost'){
        this.port = port;
        this.address = address;
        this.server = dgram.createSocket('udp4');
    }

    async start(){
        this.server.on('message', (data, client)=>{
            this.onData(data, client);
        });

        this.server.on('close', ()=>{});
        this.server.on('error', (err) => {this.onError(err)});

        this.server.on('listening', () => {this.onListen()});
        this.server.bind(this.port, this.address);
    }

    async stop(){
        this.server.close();
    }

    async onListen(){
        throw new Error(`'listening' UDP server's event without handler.`);
    }

    async onData(data, client){
        throw new Error(`'message' UDP server's event without handler.`);
    }

    async onError(err){
        throw new Error(`'error' UDP server's event without handler.`);
    }

};

module.exports = UDPSocket;