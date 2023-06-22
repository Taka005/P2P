const net = require("net");

class P2P{
  constructor(config){
    this.config = {
      ServerPort: config.ServerPort||5000,
      ClientPort: config.ClientPort||5000,
      ket: config.key||"NONE"
    };

    this.server = net.createServer((socket)=>{
      socket.on("data",(_data)=>{
        const data = crypto.decode(_data.toString().trim(),config.key||"NONE");
        if(!data) return;
      
        if(data.event === "ADD_REQUEST"){

        }else if(data.event === "DELETE_REQUEST"){

        }else if(data.event === "ADD_REQUEST_ACCEPT"){

        }else if(data.event === "DELETE_REQUEST_ACCEPT"){

        }else if(data.event === "SEND_MESSAGE"){

        }
      });
    });      
  }

  run(){
    this.server.listen(this.config.ServerPort,()=>{
      console.log("P2Pネットワークが開始されました");
    });
  }

  
}

module.exports = P2P;