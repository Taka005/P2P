const net = require("net");
const crypto = require("crypto");
const { EventEmitter } = require("events");
const package = require("./package.json");

class P2P extends EventEmitter{
  constructor(config){
    super();

    this.config = {
      ServerPort: config.ServerPort||5000,
      ClientPort: config.ClientPort||5000,
      key: config.key||"NONE",
      UserName: config.UserName
    };

    this.server = net.createServer((socket)=>{
      socket.on("data",(_data)=>{
        const data = this.decode(_data.toString().trim(),config.key||"NONE");
        if(!data) return;
        this.emit("data",data);

        if(data.event === "ADD_REQUEST"){
          this.emit()
        }else if(data.event === "DELETE_REQUEST"){

        }else if(data.event === "ADD_REQUEST_ACCEPT"){

        }else if(data.event === "DELETE_REQUEST_ACCEPT"){

        }else if(data.event === "SEND_MESSAGE"){

        }
      });
    });      
  }

  start(){
    this.server.listen(this.config.ServerPort,()=>{
      console.log("P2Pネットワークが開始されました");
      this.emit("start");
    });
  }

  stop(){
    this.server.close();
    console.log("P2Pネットワークを終了します");
    this.emit("stop");
  }

  DataSend(address,event,data){
    if(!data||!event) throw new Error("オプションが不足しています");
    try{
      const client = net.connect({ host: address, port: this.config.ClientPort });
      client.write(this.encode(JSON.stringify({
        event: event,
        client: {
          version: package.version,
          UserName: this.config.UserName,
          ServerPort: this.config.ServerPort,
          ClientPort: this.config.ClientPort
        },
        data: data,
        time: new Date()
      }),this.config.key));
    }catch{
      console.log("Send Failed");
    }
    client.end();
  }

  encode(data,key){
    if(!data||!key) throw new Error("オプションが不足しています");
    try{
      const cipher = crypto.createCipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      return cipher.update(data,"utf8","hex")+cipher.final("hex");
    }catch(error){
      return null;
    }
  }

  decode(data,key){
    if(!data||!key) throw new Error("オプションが不足してしていま");
    try{
      const decipher = crypto.createDecipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      return JSON.parse(decipher.update(data,"hex","utf8")+decipher.final("utf8"));
    }catch(error){
      return null;
    }
  }
}

module.exports = P2P;