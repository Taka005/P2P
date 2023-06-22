const fs = require("fs");
const addresses = require("../addresses.json");
module.exports = {
  add:(address)=>{
    addresses.push(address);
    fs.writeFileSync("./addresses.json", JSON.stringify(address), "utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  delete:(address)=>{
    delete addresses[address];
    fs.writeFileSync("./addresses.json", JSON.stringify(addresses), "utf8");
    delete require.cache[require.resolve("../addresses.json")];
  },
  has:(address)=>{
    return addresses[address];
  },
  data: addresses
}