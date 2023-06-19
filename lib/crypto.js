const crypto = require("crypto");
module.exports = {
  encode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足しています");
    try{
      const cipher = crypto.createCipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      cipher.update(data,"utf8","hex");
      return cipher.final("hex");
    }catch{
      return null;
    }
  },
  decode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足してしていま");
    try{
      const decipher = crypto.createDecipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      decipher.update(data,"hex","utf8");
      return JSON.parse(decipher.final("utf8"));
    }catch{
      return null
    }
  }
}