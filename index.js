const net = require("net");
const readline = require("readline");

const PORT = 2000;
const PORT2 = 3000;

const addresses = new Set();

const server = net.createServer((socket)=>{
  if(!addresses.has(socket.remoteAddress)){
    addresses.add(socket.remoteAddress);
    console.log(`新しいノードが接続しました: ${socket.remoteAddress}`);
  }
  console.log(addresses)

  socket.on("data",(data)=>{
    const message = data.toString().trim();
    console.log(`メッセージを受信しました: ${message} (${socket.remoteAddress})`);
  });

  socket.on("close",()=>{
    console.log(`ノードが切断されました: ${socket.remoteAddress}`);
  });
});

server.listen(PORT,()=>{
  console.log("P2Pネットワークが開始されました");
});

function addExternalAddress(address){
  addresses.add(address);
  console.log(`外部ノードが追加されました: ${address}`);
}

function sendMessage(message){
  addresses.forEach((address)=>{
    const client = net.connect({ host: address, port: PORT2 });
    client.write(message);
    client.end();
  });
}

function showAddress(){
  console.log("接続中のノード一覧:");
  addresses.forEach((address)=>{
    console.log(address);
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt("コマンドを入力してください (m: メッセージ送信, p: ノード一覧表示, add: 外部ノード追加, q: 終了): ");
rl.prompt();

rl.on("line",(line)=>{
  const command = line.trim();

  if(command.startsWith("m ")){
    sendMessage(command.substring(2).trim());
  }else if(command === "p"){
    showAddress();
  }else if(command === "q"){
    server.close();
    rl.close();
  }else if(command.startsWith("add ")){
    addExternalAddress(command.substring(4).trim());
  }else{
    console.log("無効なコマンドです");
  }

  rl.prompt();
}).on("close",()=>{
  server.close();
  console.log("P2Pネットワークを終了します");
  process.exit(0);
});
