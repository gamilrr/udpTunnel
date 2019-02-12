const dgram = require('dgram');

//abstract class
class UDPClient{

    constructor(port, address = 'localhost', kalive){
        this.serverPort = port;
        this.serverAddress = address;
        this.client = dgram.createSocket('udp4');
        this.keepAlive = kalive;
        this.intv = null;
    }

    start(){
        this.client.on('message', (data, client)=>{
            this.onData(data, client);
        });

        this.client.on('close', ()=>{});
        this.client.on('error', (err) => {this.onError(err)});

        this.intv = setInterval(()=>{
            console.log(`sent ka to ${this.serverAddress}:${this.serverPort}`);
            this.client.send("k", this.serverPort, this.serverAddress);
        }, this.keepAlive*1000);
    }

    stop(){
        clearInterval(this.intv);
        this.client.close();
    }

    sendData(data){
        this.client.send(data, this.serverPort, this.serverAddress);
    }

    onData(data, server){
        console.log(`this client: ${server.address}:${server.port} sent this data: ${data}`);
    }

    onError(err){
       
    }

};

module.exports = UDPClient;