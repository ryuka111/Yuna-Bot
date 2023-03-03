const yunayt = require('./yt.js');
const util = require('util');
const {writeExifImg} = require("./exif.js");
const yt = require("yt-converter");
const ytube = require('scraper-edge');
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
    browser: ["Yuna Bot","Safari","3.0.0"],
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
      const filestiker = await writeExifImg(buffer, {packname:"Stiker By", author:"Yuna Bot\n\n0838269183692"});
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
{buttonId: "id2", buttonText: {displayText: 'Tutor ytmp3'}, type: 1},
  {buttonId: "id3", buttonText: {displayText: 'Group Yuna Open Public'}, type: 1},
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
  if(responseButton.selectedButtonId == "id2"){
   await kirim(id, 
   {text:fs.readFileSync("./tutorytmp3.json").toString()})}
  if(responseButton.selectedButtonId == "id3"){
   await kirim(id, 
   {text:fs.readFileSync("./GCyuna.json").toString()})}
   }
   
      //untuk menu lainnya tinggal tulis kode diatas dimulai dari if dan pastekan di bawah ini
if(pesan=="ytfs"){fs.writeFileSync("./ytwait.json","off")
xixy.sendMessage(id,{text: "*_🔮Yt Refresh Done_*"})}
     // paste kan di area ini
      
if(pesan=="Mainten done"){fs.writeFileSync("./maintenance.json","off")
xixy.sendMessage(id,{text: "*🔮Yuna Bot* _Maintenance Done_"})}
      
});
//Area Akhir Menu dan Kawan kawannya
}
  xixyBot()