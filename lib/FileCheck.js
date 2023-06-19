module.exports = ()=>{
  try{
    require("./AddressManager");
    require("./crypto");
    require("./DataBuilder");
    require("../data.json");
    require("../package.json");
    require("../package-lock.json");
  }catch{
    throw new Error("一部のファイルが不足しています");
    process.exit(0);
  }

  const config = require("../config.json");
  if(
    !config.ServerPort||
    !config.ClientPort||
    !config.UserName
  ){
    throw new Error("config.jsonが破損しています");
    process.exit(0);
  }
}