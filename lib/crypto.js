const crypto = require("crypto");
module.exports = {
  encode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足しています");
    try{
      const cipher = crypto.createCipheriv("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"),Buffer.alloc(16));
      let encrypted = cipher.update(data,"utf8","hex");
      encrypted += cipher.final("hex");
      return encrypted;
    }catch(error){
      console.log(error);
      return null;
    }
  },
  decode:(data,key)=>{
    if(!data||!key) throw new Error("オプションが不足してしていま");
    try{
      const decipher = crypto.createDecipheriv("aes-256-cfb",crypto.createHash("sha256").update(key).digest("hex"),Buffer.alloc(16));
      let decrypted = decipher.update(data,"hex","utf8");
      decrypted += decipher.final("utf8");
      return JSON.parse(decrypted);
    }catch(error){
      console.log(error);
      return null;
    }
  }
}