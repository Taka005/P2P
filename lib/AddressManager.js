const fs = require("fs");
module.exports = {
  add:(address)=>{
    const addresses = require("../addresses.json");
    addresses.push(address);
    fs.writeFileSync("./addresses.json",JSON.stringify(addresses),"utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  delete:(address)=>{
    const addresses = require("../addresses.json");
    fs.writeFileSync("./addresses.json",JSON.stringify(addresses.filter(data=>data !== address)),"utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  has:(address)=>{
    const addresses = require("../addresses.json");
    return addresses.includes(address);
  },
  data:()=>{
    return require("../addresses.json");
  }
}