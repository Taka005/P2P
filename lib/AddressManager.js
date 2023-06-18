const addresses = require("../data.json").addresses;
module.exports = {
  add:(address)=>{
    addresses.push(address);
    this.clear();
  },
  delete:(address)=>{
    delete addresses[address];
    this.clear();
  },
  has:(address)=>{
    return addresses[address];
  },
  clear:()=>{
    delete require.cache[require.resolve("../data.json")];
  },
  data: addresses
}