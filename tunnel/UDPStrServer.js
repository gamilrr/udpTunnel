const UDPSocket = require('./UDPSocket');
const SelfQueue = require('./SelfQueue');

class UDPStrServer extends UDPSocket{

    constructor(port, address){
        super(port, address);
    }

    onListen(){
        //DEBUG
        console.log(`UDPStreamer server listening by ${this.address}:${this.port}`);
    }

    onData(data, client){
        try{
            SelfQueue.push(data);
        }catch(e){
            //TODO do something with this error
        }

        //DEBUG
        console.log(`this streamer: ${client.address}:${client.port} sent this data:\n ${data}\n`);
    }

    onError(err){

    }
}


module.exports = UDPStrServer;