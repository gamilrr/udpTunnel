const UDPSocket = require('./UDPSocket');


class UDPStreamer extends UDPSocket{

    constructor(port, address){
        super(port, address);
    }

    async onListen(){
        console.log(`UDPStreamer server listening by ${this.address}:${this.port}`);
    }

    async onData(data, client){
        console.log(`this client: ${client.address}:${client.port} sent this data:\n ${data}\n`);
    }

    async onError(err){

    }
}


module.exports = UDPStreamer;