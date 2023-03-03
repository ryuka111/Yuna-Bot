const { exec } = require("child_process");

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

      if(connection === 'close') {console.log("Koneksi Terputus... Reconecting...")}

      if(connection === 'close') {xixyBot()}

      if(connection === "open"){console.log("Bot Tersambung Ke Server Wa")}

   })

  xixy.ev.on ('creds.update', saveState)

  

xixy.ev.on("messages.upsert", async ({messages,type}) =>{

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

xixy.ev.on("messages.upsert", async ({messages,type})=>{

      //console.log(messages)

      if(!messages[0]||!messages[0].message)return;

      const msg = messages[0];

      const pesan = messages[0].message.conversation;

      const kirim = xixy.sendMessage;

      const id = messages[0].key.remoteJid

      

//Menu Creator

const objek=pesan.split("_")

    if(objek[0]==="tambah" && objek[1].includes("#") && objek.length=="3"){

      fs.writeFileSync("./"+`${objek[1].slice(1)}.json`,objek[2]),kirim(id,{text:"Sukses Menambahkan Keyword"})}

      

//Auto Akses # key

    if(pesan.split(" ").length=="1" && pesan.includes("#") && pesan !== "#menu"){

      const data = path.join("./", `${pesan.toString().slice(1)}.json`)

      try{

      kirim(id,{text:fs.readFileSync(data).toString()+"\n"+fs.readFileSync("./footer.json").toString()})

} catch (error) {kirim(id,{text:"Ups kode salah atau Menu ini tidak tersedia"})}

  }





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

xixy.ev.on("messages.upsert", async ({messages,type})=>{

      //console.log(messages)

      if(!messages[0]||!messages[0].message||!messages[0].message.extendedTextMessage)return;

      const msg = messages[0];

      const pesan = messages[0].message.extendedTextMessage.text;

      const kirim = xixy.sendMessage;

      const id = messages[0].key.remoteJid;

      

      

//Menu Creator

const objek=pesan.split("_")

    if(objek[0]==="tambah" && objek[1].includes("#") && objek.length=="3"){

      fs.writeFileSync("./"+`${objek[1].slice(1)}.json`,objek[2]),kirim(id,{text:"Sukses Menambahkan Keyword"})}

      

//Auto Akses # key

   

      const data = path.join("./", `${pesan.toString().slice(1)}.json`)

      try{

      kirim(id,{text:fs.readFileSync(data).toString()+"\n"+fs.readFileSync("./footer.json").toString()})

} catch (error) {kirim(id,{text:"Ups kode salah atau Menu ini tidak tersedia"})}

  }





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


      

      
if(pesan=="Maintenance"){fs.writeFileSync("./maintenance.json","on")
xixy.sendMessage(id,{text: "*⭕Yuna Bot* _Mode Maintenance Diaktifkan_"})}
      
try{
if(pesan.split(" ")[0]=="#play" && pesan.includes("#play") && fs.readFileSync("./maintenance.json").toString()=="on"){kirim(id,{text: "*⭕Yuna Bot* _sedang maintenance, harap bersabar menunggu maintenance selesai_"})
const tombol = [
{buttonId: "id1", buttonText: {displayText: 'Donasi Pengembangan'}, type: 1},

  ]
const buttonInfo = {
image: {url: './maintenance.jpg'},
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
} 
} catch (error) {}

try{
if(pesan.split(" ")[0]=="#stiker" && pesan.includes("#stiker") && fs.readFileSync("./maintenance.json").toString()=="on"){kirim(id,{text: "*⭕Yuna Bot* _sedang maintenance, harap bersabar menunggu maintenance selesai_"})
const tombol = [
{buttonId: "id1", buttonText: {displayText: 'Donasi Pengembangan'}, type: 1},

  ]
const buttonInfo = {
image: {url: './maintenance.jpg'},
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
} 
} catch (error) {}

try{
if(pesan.split(" ")[0]=="#menu" && pesan.includes("#menu") && fs.readFileSync("./maintenance.json").toString()=="on"){kirim(id,{text: "*⭕Yuna Bot* _sedang maintenance, harap bersabar menunggu maintenance selesai_"})
const tombol = [
{buttonId: "id1", buttonText: {displayText: 'Donasi Pengembangan'}, type: 1},

  ]
const buttonInfo = {
image: {url: './maintenance.jpg'},
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
} 
} catch (error) {}

})     

      

     // paste kan di area ini
    

      



//Area Akhir Menu dan Kawan kawannya
    
}

  xixyBot()
