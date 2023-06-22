const fs = require("fs");
let addresses = require("../addresses.json");
module.exports = {
  add:(address)=>{
    addresses.push(address);
    fs.writeFileSync("./addresses.json",JSON.stringify(addresses),"utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  delete:(address)=>{
    addresses = addresses.filter(data=>data !== address);
    console.log(addresses)
    fs.writeFileSync("./addresses.json",JSON.stringify(addresses),"utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  has:(address)=>{
    return addresses.includes(address);
  },
  data: addresses
}