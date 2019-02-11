const UDPSocket = require('./UDPSocket');
const SelfQueue = require('./SelfQueue');

class UDPStreamer extends UDPSocket{

    constructor(port, address){
        super(port, address);
    }

    onListen(){
        console.log(`UDPStreamer server listening by ${this.address}:${this.port}`);
    }

    onData(data, client){
        SelfQueue.push(data);
        console.log(`this client: ${client.address}:${client.port} sent this data:\n ${data}\n`);
    }

    onError(err){

    }
}


module.exports = UDPStreamer;