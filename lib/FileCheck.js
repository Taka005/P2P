module.exports = ()=>{
  try{
    require("./AddressManager");
    require("./crypto");
    require("./DataBuilder");
    require("../addresses.json");
    require("../package.json");
    require("../package-lock.json");
    require("../config.json");
  }catch{
    console.log("一部のファイルが不足しています");
    process.exit(0);
  }

  const config = require("../config.json");
  if(
    !config.ServerPort||
    !config.ClientPort||
    !config.UserName
  ){
    console.log("config.jsonが破損しています");
    process.exit(0);
  }
}