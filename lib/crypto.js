const crypto = require("crypto");
module.exports = {
  encode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足しています");
    try{
      const cipher = crypto.createCipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      let encrypted = cipher.update(data,"utf8","hex") + cipher.final("hex");
      return encrypted;
    }catch(error){
      return null;
    }
  },
  decode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足してしていま");
    try{
      const decipher = crypto.createDecipher("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"));
      let decrypted = decipher.update(data,"hex","utf8") + decipher.final("utf8");
      return JSON.parse(decrypted);
    }catch(error){
      return null;
    }
  }
}