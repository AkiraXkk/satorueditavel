// use como quiser pq é totalmente editável 
// faca seu próprio bot
// nao precisa deixar os créditos mas se quiser eu agradeço 
//     ╱╱┏╮╱╱╱╱╱╱╱╱╱╱
//     ╱╱┃┃╱╱┳╱┓┳╭┛┳┓
//     ▉━╯┗━╮┃╱┃┣┻╮┣╱
//     ▉┈┈┈┈┃┻┛┛┻╱┗┗┛
//     ▉╮┈┈┈┃▔▔▔▔▔▔▔▔
//     ╱╰━━━╯ 
// https://youtube.com/channel/UCc1df-Do_OpYwC_QlTi3vZQ
const { 
default: WAclientection,
MessageType,
Presence,
GroupSettingChange,
WA_MESSAGE_STUB_TYPES,
Mimetype,
relayWAMessage,
makeInMemoryStore,
useSingleFileAuthState,
BufferJSON, 
DisclientectReason, 
fetchLatestBaileysVersion,
downloadContentFromMessage,
delay
} = require("@adiwajshing/baileys")
const fs = require("fs")
const chalk = require("chalk")
const P = require("pino") 
const clui = require("clui")
const axios = require('axios')
const fetch = require("node-fetch")
const yts = require("yt-search")
const speed = require("performance-now")
const { color } = require("./lib/color")
const { fromBuffer } = require("file-type")
const {
banner,
banner2
} = require("./lib/functions")
// DATA E HORA //
const moment = require("moment-timezone")
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss")
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY")
/// ARQUIVOS JSON ////

const config = JSON.parse(fs.readFileSync("./files/config/data.json"))
const { getRandom, getExtension} = require("./lib/functions")
const registro = JSON.parse(fs.readFileSync('./src/seguranca/registro.json'))
const upload = require("./lib/functions")
const sotoy = JSON.parse(fs.readFileSync('./sotoy.json'))
const { addFlod , isFlod } = require('./spam.js')
const { isFiltered, addFilter } = require('./spam.js')
const _leveling = JSON.parse(fs.readFileSync('./arquivos/lib/leveling.json'))
const welkom = JSON.parse(fs.readFileSync('./arquivos/seguranca/welkom.json'))
const antifake = JSON.parse(fs.readFileSync('./arquivos/seguranca/antifake.json'))
const _level = JSON.parse(fs.readFileSync('./arquivos/level.json'))
const prem = JSON.parse(fs.readFileSync('./arquivos/premium.json'))
const registros = JSON.parse(fs.readFileSync("./arquivos/lib/registros.json"))
const fenix = JSON.parse(fs.readFileSync("./arquivos/clans/fenix.json"))
const touros = JSON.parse(fs.readFileSync("./arquivos/clans/touros.json"))
const akatsuki = JSON.parse(fs.readFileSync("./arquivos/clans/akatsuki.json"))
const dragonforce = JSON.parse(fs.readFileSync("./arquivos/clans/dragonforce.json"))
const manji = JSON.parse(fs.readFileSync('./arquivos/clans/manji.json'))
const exsuwordpowers = JSON.parse(fs.readFileSync('./arquivos/clans/exsuwordpowers.json'))
const img = JSON.parse(fs.readFileSync("./arquivos/fotos/logo.json"))
const antilink = JSON.parse(fs.readFileSync('./src/antilink.json'))
const uang = JSON.parse(fs.readFileSync('./arquivos/dinheiro.json'))

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}
const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

///  prefixo e dono aqui ///
logo = img.logo
nomeBot = config.nomeBot
numeroBot = config.numeroBot
nomeDono = config.nomeDono
numeroDono = config.numeroDono
const dono = "557598659560"
prefix = config.prefix
prefixo = config.prefix

let girastamp = speed()
let latensi = speed() - girastamp

async function startClover () {
const store = makeInMemoryStore({ logger: P().child({ level: "debug", stream: "store" }) })

// 𝚀𝚁𝙲𝙾𝙳𝙴
const { state, saveState } = useSingleFileAuthState("./clover.json")
console.log(banner.string)
console.log( color('⭐'),color('Conectando....🤔'))
const client = WAclientection({
logger: P({ level: "silent" }),
printQRInTerminal: true,
auth: state
})

client.ev.on ("creds.update", saveState)

store.bind(client.ev)
client.ev.on("chats.set", () => {
console.log("Tem conversas", store.chats.all())
})

client.ev.on("contacts.set", () => {
console.log("Tem contatos", Object.values(store.contacts))
})

client.ev.on("clientection.update", (update) => {
const { clientection, lastDisclientect } = update
if(clientection === "close") {
const shouldReclientect = (lastDisclientect.error)?.output?.statusCode !== DisclientectReason.loggedOut
console.log("Conexão fechada devido a", lastDisclientect.error, "Tentando reconectar...", shouldReclientect)

if(shouldReclientect) {
startClover()
}

} else if(clientection === "open") {
console.log("bot ta online!!!")
}

})

client.ev.on("messages.upsert", async m => {
try {
const info = m.messages[0]
if (!info.message) return 
await client.sendReadReceipt(info.key.remoteJid, info.key.participant, [info.key.id])
if (info.key && info.key.remoteJid == "status@broadcast") return
const altpdf = Object.keys(info.message)
const type = altpdf[0] == "senderKeyDistributionMessage" ? altpdf[1] == "messageContextInfo" ? altpdf[2] : altpdf[1] : altpdf[0]
global.prefixo

const content = JSON.stringify(info.message)
const from = info.key.remoteJid

// Body
const body = (type === 'conversation' &&
info.message.conversation.startsWith(prefixo)) ?
info.message.conversation: (type == 'imageMessage') &&
info.message[type].caption.startsWith(prefixo) ?
info.message[type].caption: (type == 'videoMessage') &&
info.message[type].caption.startsWith(prefixo) ?
info.message[type].caption: (type == 'extendedTextMessage') &&
info.message[type].text.startsWith(prefixo) ?
info.message[type].text: (type == 'listResponseMessage') &&
info.message[type].singleSelectReply.selectedRowId ?
info.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ?
info.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ?
info.message[type].singleSelectReply.selectedRowId: (type == 'client.sendMessageButtonMessage') &&
info.message[type].selectedButtonId ?
info.message[type].selectedButtonId: (type == 'stickerMessage') && ((info.message[type].fileSha256.toString('base64')) !== null && (info.message[type].fileSha256.toString('base64')) !== undefined) ? (info.message[type].fileSha256.toString('base64')): ""
budy = (type === 'conversation') ? info.message.conversation : (type === 'extendedTextMessage') ? info.message.extendedTextMessage.text : ''

const args = body.trim().split(/ +/).slice(1)
const isCmd = body.startsWith(prefixo)
const comando = isCmd ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase() : null

// Bady
bady = (type === "conversation") ? info.message.conversation : (type == "imageMessage") ? info.message.imageMessage.caption : (type == "videoMessage") ? info.message.videoMessage.caption : (type == "extendedTextMessage") ? info.message.extendedTextMessage.text : (info.message.listResponseMessage && info.message.listResponseMessage.singleSelectenviar.selectedRowId) ? info.message.listResponseMessage.singleSelectenviar.selectedRowId: ""

// Budy
budy = (type === "conversation") ? info.message.conversation : (type === "extendedTextMessage") ? info.message.extendedTextMessage.text : ""

//===

button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedDisplayText : ""
button = (type == "buttonsResponseMessage") ? info.message.buttonsResponseMessage.selectedButtonId : ""
listMessage = (type == "listResponseMessage") ? info.message.listResponseMessage.title : ""

var pes = (type === "conversation" && info.message.conversation) ? info.message.conversation : (type == "imageMessage") && info.message.imageMessage.caption ? info.message.imageMessage.caption : (type == "videoMessage") && info.message.videoMessage.caption ? info.message.videoMessage.caption : (type == "extendedTextMessage") && info.message.extendedTextMessage.text ? info.message.extendedTextMessage.text : ""

bidy =  budy.toLowerCase()

// Enviar gifs
const enviargif = (videoDir, caption) => {
client.sendMessage(from, {
video: fs.readFileSync(videoDir),
caption: caption,
gifPlayback: true
})
}

// Enviar imagens
const enviarimg = (imageDir, caption) => {
client.sendMessage(from, {
image: fs.readFileSync(imageDir),
caption: caption
})
}

// Enviar figs
const enviarfig = async (figu, tag) => {
bla = fs.readFileSync(figu)
client.sendMessage(from, {sticker: bla}, {quoted: info})
}

const getFileBuffer = async (mediakey, MediaType) => { 
const stream = await downloadContentFromMessage(mediakey, MediaType)

let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}



const mentions = (teks, memberr, id) => {
(id == null || id == undefined || id == false) ? client.sendMessage(from, {text: teks.trim(), mentions: memberr}) : client.sendMessage(from, {text: teks.trim(), mentions: memberr})
}

const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
const arg = body.substring(body.indexOf(" ") + 1)
const numeroBot = client.user.id.split(":")[0]+"@s.whatsapp.net"
const argss = body.split(/ +/g)
const testat = body
const ants = body
const isGroup = info.key.remoteJid.endsWith("@g.us")
const tescuk = ["0@s.whatsapp.net"]
const q = args.join(" ")
const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
const sender = isGroup ? info.key.participant : info.key.remoteJid
const pushname = info.pushName ? info.pushName : ""
const groupMetadata = isGroup ? await client.groupMetadata(from) : ""
const groupName = isGroup ? groupMetadata.subject : ""
const groupDesc = isGroup ? groupMetadata.desc : ""
const groupMembers = isGroup ? groupMetadata.participants : ""
//const { menu } = require('./arquivos/menus/menu.js')
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ""
const members = isGroup ? groupMetadata.participants : ""


resposta = {
espere: "࿐ Aguarde...enviando ",
dono: "࿐ Esse comando so pode ser usado pelo meu dono!!! ",
grupo: "࿐ Esse comando só pode ser usado em grupo ",
privado: "࿐ Esse comando só pode ser usado no privado ",
adm: "࿐ Esse comando só pode ser usado por administradores de grupo",
botadm: " ࿐ Este comando só pode ser usado quando o bot se torna administrador ",
registro: `[⚙️️] Você não se registrou utilize ${prefixo}rg para se registrar `,
norg: "[⚙️️] Você ja está registrado ",
erro: "࿐ Error, tente novamente mais tarde "
}




const live = {key : {participant : '0@s.whatsapp.net'},message: {liveLocationMessage: {}}} 


const imgm = {key : {participant : '0@s.whatsapp.net'},message: {imageMessage: {}}}


const vid = {key : {participant : '0@s.whatsapp.net'},message: {videoMessage: {}}}


const contato = {key : {participant : '0@s.whatsapp.net'},message: {contactMessage:{displayName: `${pushname}`}}}


const doc = {key : {participant : '0@s.whatsapp.net'},message: {documentMessage:{}}}


// Consts dono/adm etc...
const quoted = info.quoted ? info.quoted : info
const mime = (quoted.info || quoted).mimetype || ""
const isBot = info.key.fromMe ? true : false
const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false
const isAntiLink = isGroup ? antilink.includes(from) : false
const isGroupAdmins = groupAdmins.includes(sender) || false 
const isWelkom = isGroup ? welkom.includes(from) : false
const isAntiFake = isGroup ? antifake.includes(from) : false
banChats = true
const isLevelingOn = isGroup ? _leveling.includes(from) : true 
const isAntilink = sender.includes(antilink)
const argis = bidy.trim().split(/ +/)
const isOwner = sender.includes(dono)
const enviar = (texto) => {
client.sendMessage(from, { text: texto }, {quoted: info})
} 
const isRegistro = registros.includes(sender)
const isTouros = touros.includes(sender)
const isFenix = fenix.includes(sender)
const isManji = manji.includes(sender)
const isAkatsuki = akatsuki.includes(sender)
const isDragonforce = dragonforce.includes(sender)
const isExsuwordpowers = exsuwordpowers.includes(sender)
// PRA ENVIAR BOTÃO DE TEMPLATE
const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
templateMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
templateButtons: but,
}
client.sendMessage(id, templateMessage, {quoted: vr})
}
// Envia imagem com botão
const enviarImgB = async (id, img1, text1, desc1, but = [], vr) => {
buttonMessage = {
image: {url: img1},
caption: text1,
footer: desc1,
buttons: but,
headerType: 4
}
client.sendMessage(id, buttonMessage, {quoted: vr})
}


// Consts isQuoted
const isImage = type == "imageMessage"
const isVideo = type == "videoMessage"
const isAudio = type == "audioMessage"
const isSticker = type == "stickerMessage"
const isContact = type == "contactMessage"
const isLocation = type == "locationMessage"
const isProduct = type == "productMessage"
const isMedia = (type === "imageMessage" || type === "videoMessage" || type === "audioMessage")
typeMessage = body.substr(0, 50).replace(/\n/g, "")
if (isImage) typeMessage = "Image"
else if (isVideo) typeMessage = "Video"
else if (isAudio) typeMessage = "Audio"
else if (isSticker) typeMessage = "Sticker"
else if (isContact) typeMessage = "Contact"
else if (isLocation) typeMessage = "Location"
else if (isProduct) typeMessage = "Product"
const isQuotedMsg = type === "extendedTextMessage" && content.includes("textMessage")
const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage")
const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage")
const isQuotedDocument = type === "extendedTextMessage" && content.includes("documentMessage")
const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage")
const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage")
const isQuotedContact = type === "extendedTextMessage" && content.includes("contactMessage")
const isQuotedLocation = type === "extendedTextMessage" && content.includes("locationMessage")
const isQuotedProduct = type === "extendedTextMessage" && content.includes("productMessage")

outrasVariavel = "bot";

let {name, urlMinhaApikey, aurlSexo, compreSuaApikey, cdd, crtt, baterai, charging, autoHourActivate, emoji_bot, blocked, multi, nopref, variosPrefixo, leitor} = outrasVariavel

// FUNCÃO DE DINHERO //
const addATM = (sender) => {
const obj = {id: sender, uang : 0}
uang.push(obj)
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
const addKoinUser = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang += amount
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
}
const checkATMuser = (sender) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
return uang[position].uang
}
}
const confirmATM = (sender, amount) => {
let position = false
Object.keys(uang).forEach((i) => {
if (uang[i].id === sender) {
position = i
}
})
if (position !== false) {
uang[position].uang -= amount
fs.writeFileSync('./arquivos/dinheiro.json', JSON.stringify(uang))
}
}

if(isGroup) {
blx = 'Meмвro࿐'}

if(isOwner) {
 blx = 'ᎠᎾᏁᎾ࿐'}

if(isGroupAdmins) {
blx = 'Adмιn࿐'}
var clã = 'Não esta em nenhum clã'
if (isDragonforce) {
clã = '⚜️Dragonforce🔱'
} 
if (isFenix) {
clã = '💫Fênix💫'
}   
if (isManji) {
clã = '️卍Manji de Tokyo卍'
}
if (isTouros) {
clã = '♣️Touros Negros♣️'
}   
if (isAkatsuki) {
clã = '🩸Akatsuki🩸'
}
if (isExsuwordpowers) {
clã = '✨família  exsuwordpowers✨'
}

const dinheiro = checkATMuser(sender)


if(budy == `${prefixo}`) {
enviar('🤔👍')}
const dados = m.messages[0];

if (budy.includes("https://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
if (budy.includes("wa.me")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }
if (budy.includes("http://")){
		     if (!isGroup) return
		     if (!isAntiLink) return
		     if (isGroupAdmins) return enviar(`*${pushname}* vc é admin por isso não vou te banir`)
		   var Kick = `${sender.split("@")[0]}@s.whatsapp.net`
		    setTimeout( () => {
	    	enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`)
	     	}, 100)
	     	enviar(`*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`)
		    setTimeout( () => {  
		    client.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {enviar(`*ERROR:* ${e}`)}) 
					}, 10)
		      setTimeout( () => {
	          
	          }, 0)
		      }








if(isGroup && isCmd) {
if(isFiltered(sender)) return enviar(`*Não floda...*`)
addFilter(sender)}

const text = args.join(" ")
const c = args.join(' ')
// Comando no pv
if (isGroup && isCmd) console.log(`
${color(`Comando em grupo`)}
${color(`Comando:`)} ${comando}
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} ${groupName}
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (isGroup && !isCmd) console.log(`
${color(`Mensagem em grupo`)}
${color(`Comando:`)} Não
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} ${groupName}
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (!isGroup && isCmd) console.log(`
${color(`Comando no pv`)}
${color(`Comando:`)} ${comando}
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} Não
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)

if (!isGroup && !isCmd) console.log(`
${color(`Mensagem no pv`)}
${color(`Comando:`)} Não
${color(`Número:`)} ${sender.split("@")[0]}
${color(`Grupo:`)} Não
${color(`Nome:`)} ${pushname}
${color(`BOT MD`)}
`)



switch (comando) {
// Começo dos comandos com prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//


case 'teste':
return enviar(` ok `)
break

case "menu":
templateButtons = [
{index: 1, urlButton: {displayText: 'Visite Meu canal no YouTube ', url: 'https://youtube.com/channel/UCJUG9IFD9KSQhKLyHtg1pbQ'}},
{index: 2, callButton: {displayText: 'Meu Número 📱', phoneNumber: '+55 (75) 99865-9560'}},
{index: 3, quickReplyButton: {displayText: '♧Seu perfil♧', id: '/perfil' }},
{index: 4, quickReplyButton: {displayText: '♤Ping♤', id: '/ping' }},
{index: 5, quickReplyButton: {displayText: '◇Menu 1◇', id: '/menu1'}},
]
  
templateMessage = {
text: 
"Sophia-md é uma base totalmente editável que serve tbm pra ensinar as pessoas que querem ter seu próprio bot de WhatsApp",

footer: 'SR.Clover☆',
templateButtons: templateButtons
}
await client.sendMessage(from,templateMessage)
break

case 'menu1':
enviar("aguarde...")
templateButtons = [
{index: 1, urlButton: {displayText: 'Criador', url: 'https://youtube.com/channel/UCc1df-Do_OpYwC_QlTi3vZQ'}},
{index: 2, urlButton: {displayText: 'Grupo', url: 'https://chat.whatsapp.com/C5bjoLLAKlcGGWogRakVsB'}},
]

templateMessage = {
image: {url: 'https://telegra.ph/file/2051ec65d3e66f4538c12.jpg',
quoted: info},
caption:`
┏━━••• *_MENUS_* 
┃》${prefix}menu2
┃》${prefix}menuadm
┗━━━━━━━━ ✓
┏━━••• *_UTLS_* 
┃》${prefix}cassino 
┃》${prefix}ban
┃》${prefix}perfil
┃》${prefix}toimg
┃》${prefix}listadm
┃》${prefix}ping
┃》${prefix}ppt
┃》${prefix}infogp
┗━━━━━━━━ ✓
┏━━••• *_%_* 
┃》${prefix}gay
┃》${prefix}gado
┃》${prefix}gostoso
┃》${prefix}punheteiro
┃》${prefix}lindo
┃》${prefix}feio
┗━━━━━━━━ ✓
┏━━••• *_ADM_* 
┃》${prefix}antilink 1
┃》${prefix}antilink 0
┃》${prefix}resetarlink
┃》${prefix}sair 
┃》${prefix}ban
┃》${prefix}mudardk
┃》${prefix}mudarnm
┃》${prefix}grupo a
┃》${prefix}grupo f
┃》${prefix}ban (marcamsg)
┃》${prefix}promover @
┃》${prefix}rebaixar @
┗━━━━━━━━ ✓
`,
footer: 'Clover-md',
templateButtons: templateButtons
}
client.sendMessage(from,templateMessage)
break

case "menu2":
return enviar(`
┏━━••• *_MENUS_* 
┃》${prefix}gay
┃》${prefix}gado
┃》${prefix}gostoso
┃》${prefix}punheteiro
┃》${prefix}lindo
┃》${prefix}feio
┗━━━━━━━━ ✓
`)
break

case "menuadm":
return enviar(`
┏━━••• *_MENUS_* 
┃》${prefix}antilink 1
┃》${prefix}antilink 0
┃》${prefix}resetarlink
┃》${prefix}sair 
┃》${prefix}ban
┃》${prefix}mudardk
┃》${prefix}mudarnm
┃》${prefix}grupo a
┃》${prefix}grupo f
┃》${prefix}ban (marcamsg)
┃》${prefix}promover @
┃》${prefix}rebaixar @
┗━━━━━━━━ ✓
`)
break


case 'cassino':
//CASSINO
 const soto = [
'🍊 : 🍒 : 🍐',
'🍒 : 🔔 : 🍊',
'🍇 : 🍇 : 🍇',
'🍊 : 🍋 : 🔔',
'🔔 : 🍒 : 🍐',
'🔔 : 🍒 : 🍊',
'🍊 : 🍋 : ??',		
'🍐 : 🍒 : 🍋',
'🍐 : 🍐 : 🍐',
'🍊 : 🍒 : 🍒',
'🔔 : 🔔 : 🍇',
'🍌 : 🍒 : 🔔',
'🍐 : 🔔 : 🔔',
'🍊 : 🍋 : 🍒',
'🍋 : 🍋 : 🍌',
'🔔 : 🔔 : 🍇',
'🔔 : 🍐 : 🍇',
'🔔 : 🔔 : 🔔',
'🍒 : 🍒 : 🍒',
'🍌 : 🍌 : 🍌'
]		
const mining = Math.ceil(Math.random() * 200) +1
const somtoy2 = sotoy[Math.floor(Math.random() * sotoy.length)]
if ((somtoy2 == '🥑 : 🥑 : 🥑') ||(somtoy2 == '🍉 : 🍉 : 🍉') ||(somtoy2 == '🍓 : 🍓 : 🍓') ||(somtoy2 == '🍎 : 🍎 : 🍎') ||(somtoy2 == '🍍 : 🍍 : 🍍') ||(somtoy2 == '🥝 : 🥝 : 🥝') ||(somtoy2 == '🍑 : 🍑 : 🍑') ||(somtoy2 == '🥥 : 🥥 : 🥥') ||(somtoy2 == '🍋 : 🍋 : 🍋') ||(somtoy2 == '🍐 : ?? : 🍐') ||(somtoy2 == '🍌 : 🍌 : 🍌') ||(somtoy2 == '🍒 : 🍒 : 🍒') ||(somtoy2 == '🔔 : 🔔 : 🔔') ||(somtoy2 == '🍊 : 🍊 : 🍊') ||(somtoy2 == '🍇 : 🍇 : 🍇')) {
var Vitória = "Você ganhou 🔮"
} else {
var Vitória = "Você perdeu..."
}
	const cassino = `
	©Clover𝐁𝐨𝐭
╔═════☪︎═════╗
┣► ${somtoy2}◄┛
╚═════☪︎═════╝

*${Vitória}*`
enviar(cassino)
if (Vitória == "Você ganhou!!!") {
enviar('Parabéns')
}
await client(sender)
break

case "ban":
if (info.message.extendedTextMessage != undefined || info.message.extendedTextMessage != null) {
num = info.message.extendedTextMessage.contextInfo.participant
cod = fs.readFileSync("./arquivos/audios/ban.mp3")
client.sendMessage(from, {audio: cod, mimetype: "audio/mp4", ptt:true}, {quoted: live})
client.groupParticipantsUpdate(from, [num], "remove")
} else { 
enviar("࿐ Marque a mensagem da pessoa")
}
break

case "ping":
enviar(`࿐ Velocidade de resposta ${latensi.toFixed(4)} segundos `)
break

case "toimg":
if (!isQuotedSticker) return enviar("࿐ Marca uma fig ")
buff = await getFileBuffer(info.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage, "image")
enviar(resposta.espere)
try {
client.sendMessage(from, {image: buff}, {quoted: live})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "ppt": 
if (!isGroup) return enviar(resposta.grupo)
if (args.length < 1) return enviar('exemplo: /ppt pedra')
ppt = ["pedra","papel","tesoura"]
ppy = ppt[Math.floor(Math.random() * ppt.length)]
ppg = Math.floor(Math.random() * 50)
pptb = ppy
pph = `Você ganhou ${ppg} em money`
if ((pptb == "pedra" && args == "papel") || 
(pptb == "papel" && args == "tesoura") || 
(pptb == "tesoura" && args == "pedra")) {
var vit = "vitoria"
} else if ((pptb == "pedra" && args == "tesoura") || 
(pptb == "papel" && args == "pedra") || 
(pptb == "tesoura" && args == "papel")) {
var vit = "derrota"
} else if ((pptb == "pedra" && args == "pedra") ||
(pptb == "papel" && args == "papel") ||
(pptb == "tesoura" && args == "tesoura")) {
var vit = "empate"
} else if (vit = "undefined") {
return enviar(linguagem.tterro())
}
if (vit == "vitoria") {
var tes = "Vitória do jogador"
}
if (vit == "derrota" ) {
var tes = "A vitória é do bot"
}
if (vit == "empate" ) {
var tes = "O jogo terminou em empate"
}
enviar(`Bot jogou: ${pptb}\nO jogador jogou: ${args}\n\n${tes}`)
if (tes == "Vitória do jogador") {
enviar(pph)
}
break

case 'clear': case "reiniciar":
client.sendMessage(from, ' L I M P A N D U 😎🤙\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlimpo', text, {quoted: live})
break

case "perfil":
try {
ppimg = await client.profilePictureUrl(`${sender.split("@")[0]}@c.us`, "image")
} catch(e) {
ppimg = logo
}
perfil = await getBuffer(ppimg)
enviar(resposta.espere)
try {
client.sendMessage(from, {
image: perfil,
caption: `
࿐ Aqui está suas informações 

☆ Nome: ${pushname}
☆ Número: ${sender.split("@")[0]}
☆ Wa.me: https://wa.me/${sender.split("@")[0]}
☆ Grupo: ${groupName}
`
}, {quoted: info})
tujuh = fs.readFileSync("./arquivos/audios/perfil.mp3")
await client.sendMessage(from, {audio: tujuh, mimetype: "audio/mp4", ptt:true}, {quoted: info})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case 'gay':// Sem Fotos

const aleta = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gay é De : ${aleta}%`)
break
case 'feio': // Sem Fotos
const aletb = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Feio é De : ${aletb}%`)
break
break
case 'lindo':
const aletc = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Lindo(a) é De : ${aletc}%`)
break
case 'gostoso':
const aletd = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gostoso(a) é De : ${aletd}%`)
break

case 'gado':
const alete = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De Gado(a) é De : ${alete}%`)
break
case 'punheteiro':
const aletl = `${Math.floor(Math.random() * 105)}`
enviar('Aguarde, confiscando sua porcentagem...')
await delay(5000)
enviar(`${pushname} Sua Porcentagem De punheteiro(a) é De : ${aletl}%`)
break

case "gplink":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
const link = await client.groupInviteCode(from)
enviar(`࿐ Link do grupo : https://chat.whatsapp.com/${link} `)
break

case "resetarlink":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupRevokeInvite(from)
enviar("࿐ Link de convite resetado com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "sair":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
enviar("ok...me desculpe se eu nao pude ajudá-lo(a) com o que vc precisava....adeus😔")
await delay(1000)
try {
await client.groupLeave(from)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "rebaixar":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (q < 1) return enviar("࿐ Digite o número, animal ")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "demote")
enviar(`࿐ ${q} Foi rebaixado a membro comum com sucesso `)
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "promover":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (q < 1) return enviar("࿐ Cade o número, mongolóide ")
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
client.groupParticipantsUpdate(from, [`${q}@s.whatsapp.net`], "promote")
enviar(`࿐ ${q} Foi promovido a adm com sucesso `)
kak = fs.readFileSync("./audios/promover.mp3")
client.sendMessage(from, {audio: kak, mimetype: "audio/mp4", ptt:true}, {quoted: live})
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "grupo":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
if (q == "a") {
await client.groupSettingUpdate(from, "not_announcement")
enviar("࿐ Grupo aberto com sucesso")
}
if (q == "f") {
await client.groupSettingUpdate(from, "announcement")
enviar("࿐ Grupo fechado com sucesso ")
}
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "infogp":
if (!isGroup) return enviar(resposta.grupo)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
enviar(`
📝 Nome : ${groupName}
📃 Descrição : ${groupDesc}
🆔 Id : ${from}
📅 Data : ${data}
🕛 Horário : ${hora}
`)
break

case "mudardk":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupUpdateDescription(from, `${q}`)
enviar("࿐ Descrição alterada com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case "mudarnm":
if (!isGroup) return enviar(resposta.grupo)
if (!groupAdmins) return enviar(resposta.adm)
if (!isBotGroupAdmins) return enviar(resposta.botadm)
try {
await client.groupUpdateSubject(from, `${q}`)
enviar("࿐ Nome alterado com sucesso ✓ ")
} catch(e) {
console.log(e)
enviar(resposta.erro)
}
break

case 'listadm':
				if (!isGroup) return enviar(resposta.grupo)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break







case 'antilink':
                    if (!isGroup) return enviar(mess.only.group)
					if (!isGroupAdmins) return enviar(mess.only.admin)
					if (!isBotGroupAdmins) return enviar(mess.only.Badmin)
					if (args.length < 1) return enviar('digite 1 para ativar ')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return enviar('o anti-link está ativo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						enviar('O anti-link foi ativo no grupo ✔️')
					} else if (Number(args[0]) === 0) {			
						antilink.splice(from, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						enviar('O anti-link foi desativado com sucesso neste grupo✔️')
					} else {
						enviar('1 para ativar, 0 para desativar ')
					}
					break










// Fim dos comandos com prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
default:

}
// Começo dos comandos sem prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

if(budy.match("fofo")){
client.sendMessage(from,{audio: {url: "./audios/fofo.mp3"},mimetype: 'audio/mp4',ptt: true},{quoted: info})
}

if (budy.includes("@557598659560")){
  client.sendMessage(from,{sticker: fs.readFileSync('./sticker/dono.webp')})
}





// Fim dos comandos sem prefix //
//     /\/\                              
//    (° v °)                             
//    /|    |\                            
//     V---V                             
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
} catch (e) {
console.log(e)
}

})

}
startClover()