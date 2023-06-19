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
        console.log(`${data.client.UserName}(${socket.remoteAddress})が追加されました`);
      }catch{
        console.log("追加申請を承諾出来ませんでした");
      }
    }else if(data.event === "ADD_REQUEST_ACCEPT"){
      AddressManager.add(socket.remoteAddress);
      console.log(`${data.client.UserName}(${socket.remoteAddress})が追加されました`);
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

rl.setPrompt("コマンドを入力: ");
rl.prompt();
console.log("helpと入力してコマンド一覧を表示");

rl.on("line",(line)=>{
  const command = line.trim();

  if(command.startsWith("send ")){
    SendMessage(command.substring(5).trim());
  }else if(command === "list"){
    ShowAddresses();
  }else if(command === "quit"){
    server.close();
    rl.close();
  }else if(command.startsWith("add ")){
    AddAddressRequest(command.substring(4).trim());
  }else if(command === "help"){
    console.log("send: メッセージ送信, list: ノード一覧表示, add: 外部ノード追加, quit: 終了")
  }else{
    console.log("無効なコマンドです");
  }

  rl.prompt();
}).on("close",()=>{
  server.close();
  console.log("P2Pネットワークを終了します");
  process.exit(0);
});
