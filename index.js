const {writeExifImg} = require("./exif.js");
const fs = require("fs");
const path = require("path");
const log = require("pino");
const logger = log();
const { 
default: makeWASocket, 
DisconnectReason, 
AnyMessageContent,downloadMediaMessage, 
useSingleFileAuthState 
} = require('@adiwajshing/baileys')
const { state,saveState } = useSingleFileAuthState("./sesi.json")
//Awal Koneksi
async function xixyBot() {
    const xixy = await makeWASocket({
    logger: log({ level: 'silent' }),
    browser: ["Stiker Only","Safari","3.0.0"],
    printQRInTerminal: true,
    auth: state})
  
   xixy.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
      if(connection === 'close') {xixyBot()}
   })
  xixy.ev.on ('creds.update', saveState)
  
//Area Awal Stiker
  xixy.ev.on("messages.upsert", async ({messages,type}) =>{
    const msg = messages[0];
    if(!msg||!msg.message||msg.key.remoteJid === "status@broadcast"||!msg.message.imageMessage||!msg.message.imageMessage.caption)return
 //Stiker
    if(msg.message.imageMessage.caption =='#stiker'){
      const buffer = await downloadMediaMessage(msg, "buffer");
      const filestiker = await writeExifImg(buffer, {packname:"Stiker By", author:"Yuna Bot"});
      xixy.sendMessage(msg.key.remoteJid, {sticker:{url:filestiker}})};
});
//Akhir Area Stiker

// Area Awal Menu dan kawan kawannya
xixy.ev.on("messages.upsert", async ({messages,type})=>{
      //console.log(messages)
      if(!messages[0]||!messages[0].message)return;
      const msg = messages[0];
      const pesan = messages[0].message.conversation;
      const kirim = xixy.sendMessage;
      const id = messages[0].key.remoteJid
      //menu
    if(pesan == "#menu") {
const tombol = [
{buttonId: "id1", buttonText: {displayText: 'Donasi'}, type: 1},
  ]
const buttonInfo = {
image: {url: './logo.jpg'},
caption: fs.readFileSync("./menu.json").toString(),
buttons: tombol,
headerType: 4
}
await kirim(id, buttonInfo);
}

const responseButton = messages[0].message.buttonsResponseMessage;
if(!messages[0].key.fromMe && responseButton){

  if(responseButton.selectedButtonId == "id1"){
   await kirim(id, 
   {text:fs.readFileSync("./donasi.json").toString()})}
   }}
      //untuk menu lainnya tinggal tulis kode diatas dimulai dari if dan pastekan di bawah ini
      
     // paste kan di area ini
      
      
});
//Area Akhir Menu dan Kawan kawannya
}
  xixyBot()