const net = require("net");
const readline = require("readline");

const config = require("./config.json");
const crypto = require("./lib/crypto");
const AddressManager = require("./lib/AddressManager");
const DataBuilder = require("./lib/DataBuilder");

const server = net.createServer((socket)=>{
  socket.on("data",(_data)=>{
    const data = crypto.decode(_data.toString().trim(),config.key||"NONE");
    if(!data) return;

    if(data.event === "ADD_REQUEST"){
      try{
        const client = net.connect({ host: socket.remoteAddress, port: config.subport });
        client.write(DataBuilder("ADD_REQUEST_ACCEPT"));
        client.end();

        AddressManager.add(socket.remoteAddress);
      }catch{
        console.log("追加申請を承諾出来ませんでした");
      }
    }else if(data.event === "ADD_REQUEST_ACCEPT"){
      AddressManager.add(socket.remoteAddress);
      console.log(`${address}が追加されました`);
    }else if(data.event === "SEND_MESSAGE"){
      console.log(`${data.client.UserName}(${socket.remoteAddress}): ${data.data.content}`);
    }
  });
});

server.listen(config.port,()=>{
  console.log("P2Pネットワークが開始されました");
});

function AddAddressRequest(address){
  if(AddressManager.has(address)) return console.log("指定されたアドレスは既に登録されています");
  try{
    const client = net.connect({ host: address, port: config.subport });
    client.write(DataBuilder("ADD_REQUEST"));
    client.end();
  }catch{
    console.log("指定されたアドレスに追加申請を送ることが出来ませんでした");
  }
}

function SendMessage(message){
  AddressManager.data.forEach((address)=>{
    try{
      const client = net.connect({ host: address, port: config.subport });
      client.write(DataBuilder("SEND_MESSAGE",{
        content: message
      }));
      client.end();
    }catch{
      //AddressManager.delete(address);
    }
  });
}

function ShowAddresses(){
  console.log("接続中のノード一覧:");
  AddressManager.data.forEach((address)=>{
    console.log(address);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("コマンドを入力してください (m: メッセージ送信, l: ノード一覧表示, add: 外部ノード追加, q: 終了): ");
rl.prompt();

rl.on("line",(line)=>{
  const command = line.trim();

  if(command.startsWith("m ")){
    SendMessage(command.substring(2).trim());
  }else if(command === "l"){
    ShowAddresses();
  }else if(command === "q"){
    server.close();
    rl.close();
  }else if(command.startsWith("add ")){
    AddAddressRequest(command.substring(4).trim());
  }else{
    console.log("無効なコマンドです");
  }

  rl.prompt();
}).on("close",()=>{
  server.close();
  console.log("P2Pネットワークを終了します");
  process.exit(0);
});
