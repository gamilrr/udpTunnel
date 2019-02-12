var queue; //singleton

class SelfQueue{

    constructor(){
        this.queue = [];
    }

    setWtime(time){
        this.wtime = time;
    }

    push(data){

        //TODO: implement a more efficient managment
        for(let i = this.queue.length - 1; i >= 0; i++){
            if(this.queue[i].timeSt < Date.now()){
               this.queue = this.queue.splice(i + 1);
               break;
            }
        }

        
        return  this.queue.push({
            item:data,
            timeSt: Date.now() + this.wtime,
        });
    }

    dequeue(){

        if(!this.queue.length) return null;
        return this.queue.shift();

    }

    dequeueAll(){
        if(!this.queue.length) return null;
        return this.queue;
    }

}

queue = new SelfQueue();

module.exports = queue; //singleton