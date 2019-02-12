const UDPSocket = require('./UDPSocket');
const SelfQueue = require('./SelfQueue');

class UDPClient extends UDPSocket{

    constructor(port, address){
        super(port, address);
        this.intv = null;
        this.clients = {}; //hash table with clients
    }

    start(){

        this.intv = setInterval(()=>{
           for(let clientId in this.clients){
               if(this.clients.hasOwnProperty(clientId)){
                    let client = this.clients[clientId];
                    this._sendCache(client);
               }
           }
        }, 1000);

        super.start();
    }

    stop(){
        clearInterval(this.intv);
        this.clients;
        super.stop();
    }

    onListen(){
        console.log(`UDPClient server listening by ${this.address}:${this.port}`);
    }

    onData(data, client){

        
        console.log(`this client: ${client.address}:${client.port} sent this data: ${data}`);
        
        let datajs = JSON.parse(data);

        this.clients[datajs.id] = client;

        //this._sendCache(client);
    }


    _sendCache(client){

        let queue = SelfQueue.dequeueAll();

        if(!queue) return;

        queue.forEach((item)=>{
            if(item.timeSt < Date.now()) return; //expired item
            this.server.send(item.data, client.port, client.address);
            //DEBUG
            console.log(`sent client: ${client.address}:${client.port} this data: ${item.data}`);
        });

        //TODO: implement a more efficient managment
        for(let i = queue.length - 1; i >= 0; i--){
            if(queue[i].timeSt < Date.now()){
               queue = queue.splice(i + 1);
               break;
            }
        }

    }

    onError(err){

    }
}


module.exports = UDPClient;