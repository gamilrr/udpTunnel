const dgram = require('dgram');

//abstract class
class UDPClient{

    constructor(port, address = 'localhost', kalive){
        this.serverPort = port;
        this.serverAddress = address;
        this.client = dgram.createSocket('udp4');
        this.inter = kalive;
        this.intv = null;
    }

    start(){
        this.client.on('message', (data, client)=>{
            this.onData(data, client);
        });

        this.client.on('close', ()=>{});
        this.client.on('error', (err) => {this.onError(err)});

        this.intv = setInterval(()=>{
            //DEBUG
            console.log(`sent data to ${this.serverAddress}:${this.serverPort}`);

            this.client.send("Hello World", this.serverPort, this.serverAddress);
            
        }, this.inter);
    }

    stop(){
        clearInterval(this.intv);
        this.client.close();
    }

    sendData(data){
        this.client.send(data, this.serverPort, this.serverAddress);
    }

    onData(data, server){
        //DEBUG
        console.log(`this server: ${server.address}:${server.port} sent this data: ${data}`);
    }

    onError(err){
       
    }

};

module.exports = UDPClient;