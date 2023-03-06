const { exec } = require("child_process");
const util = require('util');
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
async function yunaBot() {
    const yuna = await makeWASocket({
    logger: log({ level: 'silent' }),
    browser: ["Yuna Bot","Safari","3.0.0"],
    printQRInTerminal: true,
    auth: state})
  
   yuna.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
      if(connection === 'close') {yunaBot()}
   })
  yuna.ev.on ('creds.update', saveState)
  
//Area Awal Stiker
  yuna.ev.on("messages.upsert", async ({messages,type}) =>{
    const msg = messages[0];
    if(!msg||!msg.message||msg.key.remoteJid === "status@broadcast"||!msg.message.imageMessage||!msg.message.imageMessage.caption)return
 //stiker
 if(msg.message.imageMessage.caption =='#stiker' && fs.readFileSync("./maintenance.json").toString()=="on"){kirim(id,{text: "*⭕Yuna Bot* _sedang maintenance, harap bersabar menunggu maintenance selesai_"})
}
    if(msg.message.imageMessage.caption =='#stiker' && fs.readFileSync("./maintenance.json").toString()=="off"){
      const buffer = await downloadMediaMessage(msg, "buffer");
      const filestiker = await writeExifImg(buffer, {packname:"Stiker By", author:"Yuna Bot\n\n0838269183692"});
      yuna.sendMessage(msg.key.remoteJid, {sticker:{url:filestiker}})};
});
//Akhir Area Stiker

// Area Awal Menu dan kawan kawannya
yuna.ev.on("messages.upsert", async ({messages,type})=>{
      //console.log(messages)
      if(!messages[0]||!messages[0].message)return;
      const msg = messages[0];
      const pesan = messages[0].message.conversation;
      const kirim = yuna.sendMessage;
      const id = messages[0].key.remoteJid
      //menu
try{
if(pesan.split(" ")[0]=="#menu" && pesan.includes("#menu") && fs.readFileSync("./maintenance.json").toString()=="on"){kirim(id,{text: "*⭕Yuna Bot* _sedang maintenance, harap bersabar menunggu maintenance selesai_"})
}
} catch (error) {}
try{
if(pesan.split(" ")[0]=="#menu" && pesan.includes("#menu") && fs.readFileSync("./maintenance.json").toString()=="off"){
const tombol = [
{buttonId: "id1", buttonText: {displayText: 'Donasi'}, type: 1},
{buttonId: "id2", buttonText: {displayText: 'Tutor ytmp3'}, type: 1},
  {buttonId: "id3", buttonText: {displayText: 'Group Yuna Open Public'}, type: 1},
  {buttonId: "id5", buttonText: {displayText: 'Cara Berlangganan VIP'}, type: 1},
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
   if(responseButton.selectedButtonId == "id5"){
   await kirim(id, 
   {text:fs.readFileSync("./caravip.json").toString()})}
   }
   
      //untuk menu lainnya tinggal tulis kode diatas dimulai dari if dan pastekan di bawah ini
if(pesan=="ytfs"){fs.writeFileSync("./ytwait.json","off")
yuna.sendMessage(id,{text: "*_🔮Yt Refresh Done_*"})}
     // paste kan di area ini
 if(pesan=="maintenance on"){fs.writeFileSync("./maintenance.json","on")
yuna.sendMessage(id,{text: "*_⭕Mode Maintenance Diaktifkan!_*"})}
 
if(pesan=="Maintenance done"){fs.writeFileSync("./maintenance.json","off")
yuna.sendMessage(id,{text: "*🔮Yuna Bot* _Maintenance Done #menu untuk memulai layanan_"})}
//fitur VIP privat & grup
if(pesan=="#getkey")kirim(id,{text:id.toString()})
if(pesan.slice(0,7)=="#setkey"){fs.writeFileSync('./key.json',pesan.slice(8)),kirim(id,{text:"Sukses Berlangganan VIP")}}
if(id===fs.readFileSync('./key.json').toString()){
  //isi menu disini
  
}
//fitur VIP owner
if(pesan=="#getkeyowner")kirim(id,{text:id.toString()})
if(pesan.slice(0,7)=="#setkeyowner"){fs.writeFileSync('./ownerkey.json',pesan.slice(8)),kirim(id,{text:"Sukses")}}
if(id===fs.readFileSync('./ownerkey.json').toString()){
  
//edit mode
yuna.ev.on("messages.upsert", async ({messages,type}) =>{
const msg = messages[0];
if (!msg.message) return; // if there is no text or media message
const messageType = Object.keys(msg.message)[0]; // get what type of message it is -- text, image, video
// if the message is an ZIP
if (
  messageType === 'documentMessage' &&
  msg.message.documentMessage.title==="data.zip" &&
  msg.message.documentMessage !== null
) {
  // download stream
  const stream = await downloadMediaMessage(
    msg,
    'buffer',);
  // save to file
  await fs.writeFileSync('./data.zip', stream);
}
});
//@@@ AREA CONVERSATION MODE @@@
yuna.ev.on("messages.upsert", async ({messages,type})=>{
      //console.log(messages)
      if(!messages[0]||!messages[0].message)return;
      const msg = messages[0];
      const pesan = messages[0].message.conversation;
      const kirim = yuna.sendMessage;
      const id = messages[0].key.remoteJid
//Menu Creator
const objek=pesan.split("_")
    if(objek[0]==="tambah" && objek[1].includes("#") && objek.length=="3"){
      fs.writeFileSync("./"+`${objek[1].slice(1)}.json`,objek[2]),kirim(id,{text:"Sukses Menambahkan Keyword"})}
//Auto Akses # Key

//Standar Akses Terminal
const p=pesan.split("@")
    if(p[0]==="cmd")exec(p[1], (error, stdout, stderr) => {
    if (error){kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout)kirim(id,{text: `${stdout}`})})
//Kirim File
const k=pesan.split(" ")
const filesget ={
      document: {url: k[1]},
      mimetype: 'Mimetype.zip',
      fileName: k[1]+".zip"}
if(k[0]=='send'&& k.length== "2")kirim(id,filesget)
//Hapus file
const del=pesan.split(" ")
    if(del[0]==="hapus" && del.length=="2")exec("rm "+del[1], (error, stdout, stderr) => {
    if (error) {kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout){kirim(id,{text: `${stdout}`})}
      kirim(id,{text:"file berhasil di hapus"})})
//List file
const lst=pesan.split(" ")
    if(lst[0]==="list" && del.length=="1")exec("ls", (error, stdout, stderr) => {
    if (error) {kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout){kirim(id,{text: `${stdout}`})} })
});
//@@@ AREA EXTENDED MODE @@@
yuna.ev.on("messages.upsert", async ({messages,type})=>{
      //console.log(messages)
      if(!messages[0]||!messages[0].message||!messages[0].message.extendedTextMessage)return;
      const msg = messages[0];
      const pesan = messages[0].message.extendedTextMessage.text;
      const kirim = yuna.sendMessage;
      const id = messages[0].key.remoteJid;
//Menu Creator
const objek=pesan.split("_")
    if(objek[0]==="tambah" && objek[1].includes("#") && objek.length=="3"){
      fs.writeFileSync("./"+`${objek[1].slice(1)}.json`,objek[2]),kirim(id,{text:"Sukses Menambahkan Keyword"})}
//Standar Akses Terminal
const p=pesan.split("@")
    if(p[0]==="cmd")exec(p[1], (error, stdout, stderr) => {
    if (error){kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout)kirim(id,{text: `${stdout}`})})
//Kirim File
const k=pesan.split(" ")
const filesget ={
      document: {url: k[1]},
      mimetype: 'Mimetype.zip',
      fileName: k[1]+".zip"}
if(k[0]=='send'&& k.length== "2")kirim(id,filesget)
//Hapus file
const del=pesan.split(" ")
    if(del[0]==="hapus" && del.length=="2")exec("rm "+del[1], (error, stdout, stderr) => {
    if (error) {kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout){kirim(id,{text: `${stdout}`})}
      kirim(id,{text:"file berhasil di hapus"})})
//List file
const lst=pesan.split(" ")
    if(lst[0]==="list" && del.length=="1")exec("ls", (error, stdout, stderr) => {
    if (error) {kirim(id,{text: `${error}`})}
    if (stderr) {return;}
    if(stdout){kirim(id,{text: `${stdout}`})} })
});
}
//Area Akhir Menu dan Kawan kawannya
}
  yunaBot()