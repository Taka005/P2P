module.exports = ()=>{
  try{
    require("./AddressManager");
    require("./crypto");
    require("./DataBuilder");
    require("../data.json");
    require("../package.json");
    require("../package-lock.json");

    const config = require("../config.json");
    if(
      !config.ServerPort||
      !config.ClientPort||
      !config.UserName
    ){
      throw new Error("config.jsonが破損しています");
    }
  }catch{
    throw new Error("一部のファイルが不足しています");
  }
}