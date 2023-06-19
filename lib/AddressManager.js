const addresses = require("../data.json").addresses;
module.exports = {
  add:(address)=>{
    addresses.push(address);
    delete require.cache[require.resolve("../data.json")];
  },
  delete:(address)=>{
    delete addresses[address];
    delete require.cache[require.resolve("../data.json")];
  },
  has:(address)=>{
    return addresses[address];
  },
  data: addresses
}