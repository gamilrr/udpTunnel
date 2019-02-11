const UDPSocket = require('./UDPSocket');
const SelfQueue = require('./SelfQueue');

class UDPClient extends UDPSocket{

    constructor(port, address){
        super(port, address);
    }


    onListen(){
        console.log(`UDPClient server listening by ${this.address}:${this.port}`);
    }

    onData(data, client){

        let queue = SelfQueue.dequeueAll();

        if(!queue) return;

        queue.forEach((item)=>{
            if(item.timeSt < Date.now()) return; //expired item
            client.send(item.data);
        });

        //TODO: implement a more efficient managment
        for(let i = this.queue.length - 1; i >= 0; i++){
            if(this.queue[i].timeSt > Date.now()){
               this.queue = this.queue.splice(i + 1);
               break;
            }
        }

        console.log(`this client: ${client.address}:${client.port} sent this data: ${data}`);
    }

    onError(err){

    }
}


module.exports = UDPClient;