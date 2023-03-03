const yt = require("yt-converter");
const ytube = require('scraper-edge')
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
const { state,saveState } = useSingleFileAuthState("./sesiYT.json")
//Awal Koneksi
async function xixyBot() {
    const xixy = await makeWASocket({
    logger: log({ level: 'silent' }),
    browser: ["Server YT","Safari","3.0.0"],
    printQRInTerminal: true,
    auth: state})
  
   xixy.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
      if(connection === 'close') {xixyBot()}
   })
  xixy.ev.on ('creds.update', saveState)
      
//@@@ AREA CONVERSATION MODE @@@
xixy.ev.on("messages.upsert", async ({messages,type})=>{
      if(!messages[0]||!messages[0].message)return;
      const msg = messages[0];
      const pesan = messages[0].message.conversation;
      const kirim = xixy.sendMessage;
      const id = messages[0].key.remoteJid;

//YT Play
try{
if(pesan.split(" ")[0]=="#play" && pesan.includes("#play") && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})
}
} catch (error) {}
try{
if(pesan.split(" ")[0]=="#play" && pesan.includes("#play") && fs.readFileSync("./ytwait.json").toString()=="off"){
const yv = new ytube.default();
yv.search(pesan.slice(6)).then(results => {
if(!results.videos[0])kirim(id,{text: "Konten tidak dapat di temukan"})
if(!results.videos[0])return
const tombol = [
    {buttonId: "id4", buttonText: {displayText: 'Putar MP3'}, type: 1}]
const infoimgmusik = {
    image: {url: results.videos[0].thumbnail },
    caption: "Judul : "+results.videos[0].title+"\nKreator : "+results.videos[0].channel.name+"\nLink : "+results.videos[0].link ,
    buttons: tombol,
    headerType: 1 }
  fs.writeFileSync("./link.json",results.videos[0].link)
  kirim(id, infoimgmusik)
  })
}
} catch (error) {}

var responseButton = messages[0].message.buttonsResponseMessage;
if(!messages[0].key.fromMe && responseButton){
if(responseButton.selectedButtonId == "id4" && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})}
if(responseButton.selectedButtonId == "id4" && fs.readFileSync("./ytwait.json").toString()=="off"){
const links = fs.readFileSync("./link.json").toString()
fs.writeFileSync("./ytwait.json","on")
xixy.sendMessage(id,{text:"Mohon tunggu ya, Yuna sedang memproses data....."})
yt.convertAudio({
    url: links,
    itag: 140,
    directoryDownload: "./",
    title: "audio"},
    function (onData){},
    async function (onClose){await xixy.sendMessage(id, { audio: {url: "./audio.mp3"},mimetype: 'audio/mp4'}).then(kirimsukses =>{
      fs.unlinkSync("./audio.mp3")
      fs.writeFileSync("./ytwait.json","off")
    }) });
}
}      

//YTMP3
try{
if(pesan.split(" ")[0]=="#ytmp3" && pesan.includes("https") && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})
}
} catch (error) {}
try{
if(pesan.split(" ")[0]=="#ytmp3" && pesan.includes("https") && fs.readFileSync("./ytwait.json").toString()=="off"){
yt.getInfo(pesan.slice(7)).then(info => {
  const infoimgmusik = {
    image: {url: info.thumbnails[0].url },
    caption: "Judul : "+info.title+"\nKreator : "+info.author.name+"\n\nPermintaan kaka sedang diproses...\nMohon tunggu ya kak😊"}
  kirim(id, infoimgmusik) });

yt.convertAudio({
    url: pesan.slice(7),
    itag: 140,
    directoryDownload: "./",
    title: "audio"},
    function (onData){},
    async function (onClose){await xixy.sendMessage(id, { audio: {url: "./audio.mp3"},mimetype: 'audio/mp4'}).then(kirimsukses =>{
      fs.unlinkSync("./audio.mp3")}) });
} } catch (error) {}

});
//@@@ AREA EXTENDED MODE @@@
xixy.ev.on("messages.upsert", async ({messages,type})=>{
      if(!messages[0]||!messages[0].message||!messages[0].message.extendedTextMessage)return;
      const msg = messages[0];
      const pesan = messages[0].message.extendedTextMessage.text;
      const kirim = xixy.sendMessage;
      const id = messages[0].key.remoteJid;

//YT Play
try{
if(pesan.split(" ")[0]=="#play" && pesan.includes("#play") && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})
}
} catch (error) {}
try{
if(pesan.split(" ")[0]=="#play" && pesan.includes("#play") && fs.readFileSync("./ytwait.json").toString()=="off"){
const yv = new ytube.default();
yv.search(pesan.slice(6)).then(results => {
if(!results.videos[0])kirim(id,{text: "Konten tidak dapat di temukan"})
if(!results.videos[0])return
const tombol = [
    {buttonId: "id4", buttonText: {displayText: 'Putar MP3'}, type: 1}]
const infoimgmusik = {
    image: {url: results.videos[0].thumbnail },
    caption: "Judul : "+results.videos[0].title+"\nKreator : "+results.videos[0].channel.name+"\nLink : "+results.videos[0].link ,
    buttons: tombol,
    headerType: 1 }
  fs.writeFileSync("./link.json",results.videos[0].link)
  kirim(id, infoimgmusik)
  })
}
} catch (error) {}

var responseButton = messages[0].message.buttonsResponseMessage;
if(!messages[0].key.fromMe && responseButton){
if(responseButton.selectedButtonId == "id4" && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})}
if(responseButton.selectedButtonId == "id4" && fs.readFileSync("./ytwait.json").toString()=="off"){
const links = fs.readFileSync("./link.json").toString()
fs.writeFileSync("./ytwait.json","on")
xixy.sendMessage(id,{text:"Mohon tunggu ya, Yuna sedang memproses data....."})
yt.convertAudio({
    url: links,
    itag: 140,
    directoryDownload: "./",
    title: "audio"},
    function (onData){},
    async function (onClose){await xixy.sendMessage(id, { audio: {url: "./audio.mp3"},mimetype: 'audio/mp4'}).then(kirimsukses =>{
      fs.unlinkSync("./audio.mp3")
      fs.writeFileSync("./ytwait.json","off")
    }) });
}
}      

//YTMP3
try{
if(pesan.split(" ")[0]=="#ytmp3" && pesan.includes("https") && fs.readFileSync("./ytwait.json").toString()=="on"){kirim(id,{text: "Mohon tunggu ya kak😁, Yuna sedang menyelesaikan permintaan dari User lain, Coba lagi nanti ya😉"})
}
} catch (error) {}

try{
if(pesan.split(" ")[0]=="#ytmp3" && pesan.includes("https") && fs.readFileSync("./ytwait.json").toString()=="off"){
yt.getInfo(pesan.slice(7)).then(info => {
  const infoimgmusik = {
    image: {url: info.thumbnails[0].url },
    caption: "Judul : "+info.title+"\nKreator : "+info.author.name+"\n\nPermintaan kaka sedang diproses...\nMohon tunggu ya kak😊"}
  kirim(id, infoimgmusik) });

yt.convertAudio({
    url: pesan.slice(7),
    itag: 140,
    directoryDownload: "./",
    title: "audio"},
    function (onData){},
    async function (onClose){await xixy.sendMessage(id, { audio: {url: "./audio.mp3"},mimetype: 'audio/mp4'}).then(kirimsukses =>{
      fs.unlinkSync("./audio.mp3")}) });
} } catch (error) {}

});

}
xixyBot()