const version = require("../package.json").version;
const crypto = require("./crypto");
const config = require("../config.json");
module.exports = (event,data)=>{
  if(!event) throw new Error("オプションが不足しています");
  return crypto.encode(JSON.stringify({
    event: event,
    client: {
      version: version,
      UserName: config.UserName,
      ServerPort: config.ServerPort,
      ClientPort: config.ClientPort
    },
    data: data,
    time: new Date()
  }),config.key||"NONE");
}