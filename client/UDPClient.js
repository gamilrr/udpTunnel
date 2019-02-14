const dgram = require('dgram');

//abstract class
class UDPClient{

    constructor(port, address, kalive, id){
        this.serverPort = port;
        this.serverAddress = address;
        this.client = dgram.createSocket('udp4');
        this.keepAlive = kalive;
        this.intv = null;
        this.id = id;
    }

    start(){
        this.client.on('message', (data, client)=>{
            this.onData(data, client);
        });

        this.client.on('close', ()=>{});
        this.client.on('error', (err) => {this.onError(err)});

        this.intv = setInterval(()=>{
            //DEBUG
            console.log(`sent keepalive to ${this.serverAddress}:${this.serverPort}`);

            let kpalive = JSON.stringify({id: this.id, data: "k"});

            this.client.send(kpalive, this.serverPort, this.serverAddress);
            
        }, this.keepAlive);
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