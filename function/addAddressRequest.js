const net = require("net");
const builder = require("../lib/DataBuilder");
const config = require("../config.json");
module.exports = (address)=>{
  try{
    const client = net.connect({ host: address, port: config.port });
    client.write(builder("ADD_REQUEST"));
    client.end();
  }catch{
    console.log("指定されたアドレスに追加申請データを送ることが出来ませんでした");
  }
}