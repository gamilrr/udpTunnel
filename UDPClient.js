const UDPSocket = require('./UDPSocket');


class UDPClient extends UDPSocket{

    constructor(port, address){
        super(port, address);
    }


    async onListen(){
        console.log(`UDPClient server listening by ${this.address}:${this.port}`);
    }

    async onData(data, client){
        console.log(`this client: ${client.address}:${client.port} sent this data: ${data}`);
    }

    async onError(err){

    }
}


module.exports = UDPClient;