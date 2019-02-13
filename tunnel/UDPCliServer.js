const UDPSocket = require('./UDPSocket');
const SelfQueue = require('./SelfQueue');

class UDPCliServer extends UDPSocket{

    constructor(port, address){
        super(port, address);
        this.intv = null;
        this.clients = {empty: true}; //hash table with clients
    }

    start(){

        this.intv = setInterval(()=>{
           
           if(this.clients.empty) return;
           
           let queue = SelfQueue.dequeueAll();

           try{ 
           for(let clientId in this.clients){
               if(this.clients.hasOwnProperty(clientId)){
                    let client = this.clients[clientId]; 
                    if(client) this._sendCache(client, queue); 
                  
               }
            }
            } catch(e){
            console.log("Error sending data")
            }
        }, 10000);

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
        this.clients.empty = false;

        //this._sendCache(client);
    }


    _sendCache(client,queue){

        
        if(!queue){
            //DEBUG
            console.log("Empty cache");
            return;
        } 

        queue.forEach((item)=>{
            if(item.timeSt < Date.now()) return; //expired item
            this.server.send(item.data, client.port, client.address);
            //DEBUG
            console.log(`sent client: ${client.address}:${client.port} this data: ${item.data}`);
        });

    }

    onError(err){

    }
}


module.exports = UDPCliServer;