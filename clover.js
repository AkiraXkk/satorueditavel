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
  delay,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const P = require("pino");
const clui = require("clui");
const axios = require("axios");
const fetch = require("node-fetch");
const yts = require("yt-search");
const speed = require("performance-now");
const { color } = require("./lib/color");
const { fromBuffer } = require("file-type");
const { banner, banner2 } = require("./lib/functions");
// DATA E HORA //
const moment = require("moment-timezone");
const hora = moment.tz("America/Sao_Paulo").format("HH:mm:ss");
const data = moment.tz("America/Sao_Paulo").format("DD/MM/YY");
/// ARQUIVOS JSON ////

const config = JSON.parse(fs.readFileSync("./files/config/data.json"));
const { getRandom, getExtension } = require("./lib/functions");
const registro = JSON.parse(fs.readFileSync("./src/seguranca/registro.json"));
const upload = require("./lib/functions");
const sotoy = JSON.parse(fs.readFileSync("./sotoy.json"));
const { addFlod, isFlod } = require("./spam.js");
const { isFiltered, addFilter } = require("./spam.js");
const _leveling = JSON.parse(fs.readFileSync("./arquivos/lib/leveling.json"));
const welkom = JSON.parse(fs.readFileSync("./arquivos/seguranca/welkom.json"));
const antifake = JSON.parse(
  fs.readFileSync("./arquivos/seguranca/antifake.json")
);
const _level = JSON.parse(fs.readFileSync("./arquivos/level.json"));
const prem = JSON.parse(fs.readFileSync("./arquivos/premium.json"));
const registros = JSON.parse(fs.readFileSync("./arquivos/lib/registros.json"));
const fenix = JSON.parse(fs.readFileSync("./arquivos/clans/fenix.json"));
const touros = JSON.parse(fs.readFileSync("./arquivos/clans/touros.json"));
const akatsuki = JSON.parse(fs.readFileSync("./arquivos/clans/akatsuki.json"));
const dragonforce = JSON.parse(
  fs.readFileSync("./arquivos/clans/dragonforce.json")
);
const manji = JSON.parse(fs.readFileSync("./arquivos/clans/manji.json"));
const exsuwordpowers = JSON.parse(
  fs.readFileSync("./arquivos/clans/exsuwordpowers.json")
);
const img = JSON.parse(fs.readFileSync("./arquivos/fotos/logo.json"));
const antilink = JSON.parse(fs.readFileSync("./src/antilink.json"));
const uang = JSON.parse(fs.readFileSync("./arquivos/dinheiro.json"));

const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    if (i.admin == "admin") admins.push(i.id);
    if (i.admin == "superadmin") admins.push(i.id);
  }
  return admins;
};
const getBuffer = (url, options) =>
  new Promise(async (resolve, reject) => {
    options ? options : {};
    await axios({
      method: "get",
      url,
      headers: { DNT: 1, "Upgrade-Insecure-Request": 1 },
      ...options,
      responseType: "arraybuffer",
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch(reject);
  });

///  prefixo e dono aqui ///
logo = img.logo;
nomeBot = config.nomeBot;
numeroBot = config.numeroBot;
nomeDono = config.nomeDono;
numeroDono = config.numeroDono;
const dono = "557598659560";
prefix = config.prefix;
prefixo = config.prefix;

let girastamp = speed();
let latensi = speed() - girastamp;

async function startClover() {
  const store = makeInMemoryStore({
    logger: P().child({ level: "debug", stream: "store" }),
  });

  // 𝚀𝚁𝙲𝙾𝙳𝙴
  const { state, saveState } = useSingleFileAuthState("./clover.json");
  console.log(banner.string);
  console.log(color("⭐"), color("Conectando....🤔"));
  const satoru = WAclientection({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
  });

  satoru.ev.on("creds.update", saveState);

  store.bind(satoru.ev);
  satoru.ev.on("chats.set", () => {
    console.log("Tem conversas", store.chats.all());
  });

  satoru.ev.on("contacts.set", () => {
    console.log("Tem contatos", Object.values(store.contacts));
  });

  satoru.ev.on("clientection.update", (update) => {
    const { clientection, lastDisclientect } = update;
    if (clientection === "close") {
      const shouldReclientect =
        lastDisclientect.error?.output?.statusCode !==
        DisclientectReason.loggedOut;
      console.log(
        "Conexão fechada devido a",
        lastDisclientect.error,
        "Tentando reconectar...",
        shouldReclientect
      );

      if (shouldReclientect) {
        startClover();
      }
    } else if (clientection === "open") {
      console.log("bot ta online!!!");
    }
  });

  satoru.ev.on("messages.upsert", async (m) => {
    try {
      const info = m.messages[0];
      if (!info.message) return;
      await satoru.sendReadReceipt(info.key.remoteJid, info.key.participant, [
        info.key.id,
      ]);
      if (info.key && info.key.remoteJid == "status@broadcast") return;
      const altpdf = Object.keys(info.message);
      const type =
        altpdf[0] == "senderKeyDistributionMessage"
          ? altpdf[1] == "messageContextInfo"
            ? altpdf[2]
            : altpdf[1]
          : altpdf[0];
      global.prefixo;

      const content = JSON.stringify(info.message);
      const from = info.key.remoteJid;

      // Body
      const body =
        type === "conversation" && info.message.conversation.startsWith(prefixo)
          ? info.message.conversation
          : type == "imageMessage" &&
            info.message[type].caption.startsWith(prefixo)
          ? info.message[type].caption
          : type == "videoMessage" &&
            info.message[type].caption.startsWith(prefixo)
          ? info.message[type].caption
          : type == "extendedTextMessage" &&
            info.message[type].text.startsWith(prefixo)
          ? info.message[type].text
          : type == "listResponseMessage" &&
            info.message[type].singleSelectReply.selectedRowId
          ? info.message.listResponseMessage.singleSelectReply.selectedRowId
          : type == "templateButtonReplyMessage"
          ? info.message.templateButtonReplyMessage.selectedId
          : type === "messageContextInfo"
          ? info.message[type].singleSelectReply.selectedRowId
          : type == "satoru.sendMessageButtonMessage" &&
            info.message[type].selectedButtonId
          ? info.message[type].selectedButtonId
          : type == "stickerMessage" &&
            info.message[type].fileSha256.toString("base64") !== null &&
            info.message[type].fileSha256.toString("base64") !== undefined
          ? info.message[type].fileSha256.toString("base64")
          : "";
      budy =
        type === "conversation"
          ? info.message.conversation
          : type === "extendedTextMessage"
          ? info.message.extendedTextMessage.text
          : "";

      const args = body.trim().split(/ +/).slice(1);
      const isCmd = body.startsWith(prefixo);
      const comando = isCmd
        ? body.slice(1).trim().split(/ +/).shift().toLocaleLowerCase()
        : null;

      // Bady
      bady =
        type === "conversation"
          ? info.message.conversation
          : type == "imageMessage"
          ? info.message.imageMessage.caption
          : type == "videoMessage"
          ? info.message.videoMessage.caption
          : type == "extendedTextMessage"
          ? info.message.extendedTextMessage.text
          : info.message.listResponseMessage &&
            info.message.listResponseMessage.singleSelectenviar.selectedRowId
          ? info.message.listResponseMessage.singleSelectenviar.selectedRowId
          : "";

      // Budy
      budy =
        type === "conversation"
          ? info.message.conversation
          : type === "extendedTextMessage"
          ? info.message.extendedTextMessage.text
          : "";

      //===

      button =
        type == "buttonsResponseMessage"
          ? info.message.buttonsResponseMessage.selectedDisplayText
          : "";
      button =
        type == "buttonsResponseMessage"
          ? info.message.buttonsResponseMessage.selectedButtonId
          : "";
      listMessage =
        type == "listResponseMessage"
          ? info.message.listResponseMessage.title
          : "";

      var pes =
        type === "conversation" && info.message.conversation
          ? info.message.conversation
          : type == "imageMessage" && info.message.imageMessage.caption
          ? info.message.imageMessage.caption
          : type == "videoMessage" && info.message.videoMessage.caption
          ? info.message.videoMessage.caption
          : type == "extendedTextMessage" &&
            info.message.extendedTextMessage.text
          ? info.message.extendedTextMessage.text
          : "";

      bidy = budy.toLowerCase();

      // Enviar gifs
      const enviargif = (videoDir, caption) => {
        satoru.sendMessage(from, {
          video: fs.readFileSync(videoDir),
          caption: caption,
          gifPlayback: true,
        });
      };

      // Enviar imagens
      const enviarimg = (imageDir, caption) => {
        satoru.sendMessage(from, {
          image: fs.readFileSync(imageDir),
          caption: caption,
        });
      };

      // Enviar figs
      const enviarfig = async (figu, tag) => {
        bla = fs.readFileSync(figu);
        satoru.sendMessage(from, { sticker: bla }, { quoted: info });
      };

      const getFileBuffer = async (mediakey, MediaType) => {
        const stream = await downloadContentFromMessage(mediakey, MediaType);

        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
      };

      const mentions = (teks, memberr, id) => {
        id == null || id == undefined || id == false
          ? satoru.sendMessage(from, { text: teks.trim(), mentions: memberr })
          : satoru.sendMessage(from, { text: teks.trim(), mentions: memberr });
      };

      const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase();
      const arg = body.substring(body.indexOf(" ") + 1);
      const numeroBot = satoru.user.id.split(":")[0] + "@s.whatsapp.net";
      const argss = body.split(/ +/g);
      const testat = body;
      const ants = body;
      const isGroup = info.key.remoteJid.endsWith("@g.us");
      const tescuk = ["0@s.whatsapp.net"];
      const q = args.join(" ");
      const isUrl = (url) => {
        return url.match(
          new RegExp(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
            "gi"
          )
        );
      };
      const sender = isGroup ? info.key.participant : info.key.remoteJid;
      const pushname = info.pushName ? info.pushName : "";
      const groupMetadata = isGroup ? await satoru.groupMetadata(from) : "";
      const groupName = isGroup ? groupMetadata.subject : "";
      const groupDesc = isGroup ? groupMetadata.desc : "";
      const groupMembers = isGroup ? groupMetadata.participants : "";
      //const { menu } = require('./arquivos/menus/menu.js')
      const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
      const members = isGroup ? groupMetadata.participants : "";

      resposta = {
        espere: "࿐ Aguarde...enviando ",
        dono: "࿐ Esse comando so pode ser usado pelo meu dono!!! ",
        grupo: "࿐ Esse comando só pode ser usado em grupo ",
        privado: "࿐ Esse comando só pode ser usado no privado ",
        adm: "࿐ Esse comando só pode ser usado por administradores de grupo",
        botadm:
          " ࿐ Este comando só pode ser usado quando o bot se torna administrador ",
        registro: `[⚙️️] Você não se registrou utilize ${prefixo}rg para se registrar `,
        norg: "[⚙️️] Você ja está registrado ",
        erro: "࿐ Error, tente novamente mais tarde ",
      };

      const live = {
        key: { participant: "0@s.whatsapp.net" },
        message: { liveLocationMessage: {} },
      };

      const imgm = {
        key: { participant: "0@s.whatsapp.net" },
        message: { imageMessage: {} },
      };

      const vid = {
        key: { participant: "0@s.whatsapp.net" },
        message: { videoMessage: {} },
      };

      const contato = {
        key: { participant: "0@s.whatsapp.net" },
        message: { contactMessage: { displayName: `${pushname}` } },
      };

      const doc = {
        key: { participant: "0@s.whatsapp.net" },
        message: { documentMessage: {} },
      };

      // Consts dono/adm etc...
      const quoted = info.quoted ? info.quoted : info;
      const mime = (quoted.info || quoted).mimetype || "";
      const isBot = info.key.fromMe ? true : false;
      const isBotGroupAdmins = groupAdmins.includes(numeroBot) || false;
      const isAntiLink = isGroup ? antilink.includes(from) : false;
      const isGroupAdmins = groupAdmins.includes(sender) || false;
      const isWelkom = isGroup ? welkom.includes(from) : false;
      const isAntiFake = isGroup ? antifake.includes(from) : false;
      banChats = true;
      const isLevelingOn = isGroup ? _leveling.includes(from) : true;
      const isAntilink = sender.includes(antilink);
      const argis = bidy.trim().split(/ +/);
      const isOwner = sender.includes(dono);
      const isRegistro = registros.includes(sender);
      const isTouros = touros.includes(sender);
      const isFenix = fenix.includes(sender);
      const isManji = manji.includes(sender);
      const isAkatsuki = akatsuki.includes(sender);
      const isDragonforce = dragonforce.includes(sender);
      const isExsuwordpowers = exsuwordpowers.includes(sender);
      // PRA ENVIAR BOTÃO DE TEMPLATE
      const sendBimgT = async (id, img1, text1, desc1, but = [], vr) => {
        templateMessage = {
          image: { url: img1 },
          caption: text1,
          footer: desc1,
          templateButtons: but,
        };
        satoru.sendMessage(id, templateMessage, { quoted: vr });
      };
      // Envia imagem com botão
      const enviarImgB = async (id, img1, text1, desc1, but = [], vr) => {
        buttonMessage = {
          image: { url: img1 },
          caption: text1,
          footer: desc1,
          buttons: but,
          headerType: 4,
        };
        satoru.sendMessage(id, buttonMessage, { quoted: vr });
      };

      // Consts isQuoted
      const isImage = type == "imageMessage";
      const isVideo = type == "videoMessage";
      const isAudio = type == "audioMessage";
      const isSticker = type == "stickerMessage";
      const isContact = type == "contactMessage";
      const isLocation = type == "locationMessage";
      const isProduct = type == "productMessage";
      const isMedia =
        type === "imageMessage" ||
        type === "videoMessage" ||
        type === "audioMessage";
      typeMessage = body.substr(0, 50).replace(/\n/g, "");
      if (isImage) typeMessage = "Image";
      else if (isVideo) typeMessage = "Video";
      else if (isAudio) typeMessage = "Audio";
      else if (isSticker) typeMessage = "Sticker";
      else if (isContact) typeMessage = "Contact";
      else if (isLocation) typeMessage = "Location";
      else if (isProduct) typeMessage = "Product";
      const isQuotedMsg =
        type === "extendedTextMessage" && content.includes("textMessage");
      const isQuotedImage =
        type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedVideo =
        type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedDocument =
        type === "extendedTextMessage" && content.includes("documentMessage");
      const isQuotedAudio =
        type === "extendedTextMessage" && content.includes("audioMessage");
      const isQuotedSticker =
        type === "extendedTextMessage" && content.includes("stickerMessage");
      const isQuotedContact =
        type === "extendedTextMessage" && content.includes("contactMessage");
      const isQuotedLocation =
        type === "extendedTextMessage" && content.includes("locationMessage");
      const isQuotedProduct =
        type === "extendedTextMessage" && content.includes("productMessage");

      outrasVariavel = "bot";

      let {
        name,
        urlMinhaApikey,
        aurlSexo,
        compreSuaApikey,
        cdd,
        crtt,
        baterai,
        charging,
        autoHourActivate,
        emoji_bot,
        blocked,
        multi,
        nopref,
        variosPrefixo,
        leitor,
      } = outrasVariavel;

      // FUNCÃO DE DINHERO //
      const addATM = (sender) => {
        const obj = { id: sender, uang: 0 };
        uang.push(obj);
        fs.writeFileSync("./arquivos/dinheiro.json", JSON.stringify(uang));
      };
      const addKoinUser = (sender, amount) => {
        let position = false;
        Object.keys(uang).forEach((i) => {
          if (uang[i].id === sender) {
            position = i;
          }
        });
        if (position !== false) {
          uang[position].uang += amount;
          fs.writeFileSync("./arquivos/dinheiro.json", JSON.stringify(uang));
        }
      };
      const checkATMuser = (sender) => {
        let position = false;
        Object.keys(uang).forEach((i) => {
          if (uang[i].id === sender) {
            position = i;
          }
        });
        if (position !== false) {
          return uang[position].uang;
        }
      };
      const confirmATM = (sender, amount) => {
        let position = false;
        Object.keys(uang).forEach((i) => {
          if (uang[i].id === sender) {
            position = i;
          }
        });
        if (position !== false) {
          uang[position].uang -= amount;
          fs.writeFileSync("./arquivos/dinheiro.json", JSON.stringify(uang));
        }
      };

      if (isGroup) {
        blx = "Meмвro࿐";
      }

      if (isOwner) {
        blx = "ᎠᎾᏁᎾ࿐";
      }

      if (isGroupAdmins) {
        blx = "Adмιn࿐";
      }
      var clã = "Não esta em nenhum clã";
      if (isDragonforce) {
        clã = "⚜️Dragonforce🔱";
      }
      if (isFenix) {
        clã = "💫Fênix💫";
      }
      if (isManji) {
        clã = "️卍Manji de Tokyo卍";
      }
      if (isTouros) {
        clã = "♣️Touros Negros♣️";
      }
      if (isAkatsuki) {
        clã = "🩸Akatsuki🩸";
      }
      if (isExsuwordpowers) {
        clã = "✨família  exsuwordpowers✨";
      }

      const dinheiro = checkATMuser(sender);

      if (budy == `${prefixo}`) {
        enviar("🤔👍");
      }
      const dados = m.messages[0];

      if (budy.includes("https://")) {
        if (!isGroup) return;
        if (!isAntiLink) return;
        if (isGroupAdmins)
          return enviar(`*${pushname}* vc é admin por isso não vou te banir`);
        var Kick = `${sender.split("@")[0]}@s.whatsapp.net`;
        setTimeout(() => {
          enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`);
        }, 100);
        enviar(
          `*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`
        );
        setTimeout(() => {
          satoru.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {
            enviar(`*ERROR:* ${e}`);
          });
        }, 10);
        setTimeout(() => {}, 0);
      }
      if (budy.includes("wa.me")) {
        if (!isGroup) return;
        if (!isAntiLink) return;
        if (isGroupAdmins)
          return enviar(`*${pushname}* vc é admin por isso não vou te banir`);
        var Kick = `${sender.split("@")[0]}@s.whatsapp.net`;
        setTimeout(() => {
          enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`);
        }, 100);
        enviar(
          `*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`
        );
        setTimeout(() => {
          satoru.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {
            enviar(`*ERROR:* ${e}`);
          });
        }, 10);
        setTimeout(() => {}, 0);
      }
      if (budy.includes("http://")) {
        if (!isGroup) return;
        if (!isAntiLink) return;
        if (isGroupAdmins)
          return enviar(`*${pushname}* vc é admin por isso não vou te banir`);
        var Kick = `${sender.split("@")[0]}@s.whatsapp.net`;
        setTimeout(() => {
          enviar(`*𝑒𝑙𝑖𝑚𝑖𝑛𝑎𝑑𝑜 𝑑𝑜 𝑔𝑟𝑢𝑝𝑜*`);
        }, 100);
        enviar(
          `*_「 link  detectado 」_*\n*${pushname}* Vc será banido do grupo *${groupMetadata.subject}*`
        );
        setTimeout(() => {
          satoru.groupParticipantsUpdate(from, [Kick], "remove").catch((e) => {
            enviar(`*ERROR:* ${e}`);
          });
        }, 10);
        setTimeout(() => {}, 0);
      }

      if (isGroup && isCmd) {
        if (isFiltered(sender)) return enviar(`*Não floda...*`);
        addFilter(sender);
      }

      const text = args.join(" ");
      const c = args.join(" ");
      // Comando no pv
      if (isGroup && isCmd)
        console.log(`
	${color(`Comando em grupo`)}
	${color(`Comando:`)} ${comando}
	${color(`Número:`)} ${sender.split("@")[0]}
	${color(`Grupo:`)} ${groupName}
	${color(`Nome:`)} ${pushname}
	${color(`BOT MD`)}
	`);

      if (isGroup && !isCmd)
        console.log(`
	${color(`Mensagem em grupo`)}
	${color(`Comando:`)} Não
	${color(`Número:`)} ${sender.split("@")[0]}
	${color(`Grupo:`)} ${groupName}
	${color(`Nome:`)} ${pushname}
	${color(`BOT MD`)}
	`);

      if (!isGroup && isCmd)
        console.log(`
	${color(`Comando no pv`)}
	${color(`Comando:`)} ${comando}
	${color(`Número:`)} ${sender.split("@")[0]}
	${color(`Grupo:`)} Não
	${color(`Nome:`)} ${pushname}
	${color(`BOT MD`)}
	`);

      if (!isGroup && !isCmd)
        console.log(`
	${color(`Mensagem no pv`)}
	${color(`Comando:`)} Não
	${color(`Número:`)} ${sender.split("@")[0]}
	${color(`Grupo:`)} Não
	${color(`Nome:`)} ${pushname}
	${color(`BOT MD`)}
	`);

      async function responder(teks) {
        var data = fs.readFileSync("./arquivos/img/menu.js");
        jsonData = JSON.parse(data);
        randIndex = Math.floor(Math.random() * jsonData.length);
        randKey = jsonData[randIndex];
        buffer = await getBuffer(randKey.result);
        satoru.sendMessage(
          m.chat,
          {
            text: teks,
            contextInfo: {
              forwardingScore: 508,
              isForwarded: true,
              externalAdReply: {
                title: `𝕾𝖆𝖙𝖔𝖗𝖚 𝕸𝖚𝖑𝖙𝖎 𝕯𝖊𝖛𝖎𝖈𝖊`,
                body: `Obrigado por usar o meu bot!!\n\nMeu dono agradece!!`,
                previewType: "PHOTO",
                thumbnailUrl: ``,
                thumbnail: await getBuffer(randKey.result),
                sourceUrl: "wa.me/5555933005901",
              },
            },
          },
          { quoted: m }
        );
      }

      switch (comando) {
        ////////////////////////////////////////////
        ////////////////////FERRAMENTAS////////////
        //////////////////////////////////////////

        case "tiktok":
          if (!q) return responder(`Use assim ${command} link`);
          if (!isUrl(q)) return responder("preciso de um link");
          if (!q.includes("tiktok"))
            return responder("o link precisa ser do tiktok");
          responder(resposta.wait);
          xfar
            .Tiktok(q)
            .then((data) => {
              satoru.sendMessage(
                m.chat,
                {
                  video: { url: data.medias[0].url },
                  caption: `${data.title}\n\nVocê pode convertê-lo em vídeo sem marca d,'água ou áudio, pressione o botão abaixo para alterá-lo!`,
                  buttons: [
                    {
                      buttonId: `${prefix}tiktoknowm ${q}`,
                      buttonText: { displayText: "Sem marca d'água" },
                      type: 1,
                    },
                    {
                      buttonId: `${prefix}tiktokaudio ${q}`,
                      buttonText: { displayText: "Aúdio.mp3" },
                      type: 1,
                    },
                  ],
                  footer: "",
                },
                { quoted: m }
              );
            })
            .catch(() => responder("ocorreu um erro :/"));
          break;
        case "tiktoknowm":
          if (!q) return responder(`Use assim ${command} link`);
          //			    if (!isUrl(q)) return responder('preciso de um link')
          if (!q.includes("tiktok"))
            return responder("o link precisa ser do tiktok");
          responder(resposta.wait);
          hxz
            .ttdownloader(q)
            .then((data) => {
              satoru.sendMessage(
                m.chat,
                { video: { url: data.nowm } },
                { quoted: m }
              );
            })
            .catch(() => responder("ocorreu um erro :/"));
          break;
        case "tiktokaudio":
          if (!q) return responder(`Use assim ${command} link`);
          //			    if (!isUrl(q)) return responder('preciso de um link')
          if (!q.includes("tiktok"))
            return responder("o link precisa ser do tiktok");
          responder(resposta.wait);
          hxz
            .ttdownloader(q)
            .then((data) => {
              satoru.sendMessage(
                m.chat,
                { audio: { url: data.nowm }, mimetype: "audio/mp4" },
                { quoted: m }
              );
            })
            .catch(() => responder("ocorreu um erro :/"));
          break;
        case "ig":
        case "igdl":
        case "instagram":
          if (!q) return responder("Cadê o link??");
          if (!isUrl(q)) return responder("preciso de um link");
          if (!q.includes("instagram"))
            return responder("o link precisa ser do insta");
          var { igDownloader } = require("./lib/igdown");
          res = await igDownloader(`${q}`).catch((e) => {
            responder(e);
          });
          console.log(res);
          responderArquivoDoLink(
            m.chat,
            `${res.result.link}`,
            `${res.result.desc}`
          );
          break;
        case "playmp3":
          {
            if (!q) return responder(resposta.erro_c);

            ytPlayMp4(q).then(async (i) => {
              responder(resposta.wait);
              buffer = await getBuffer(i.url);

              // let media = await quoted.download()
              let { toAudio } = require("./lib/converter");
              let audio = await toAudio(buffer, "mp4");
              satoru.sendMessage(
                m.chat,
                { audio: audio, mimetype: "audio/mpeg", ptt: true },
                { quoted: m }
              );
            });
          }
          break;

        /*
case 'playmp3':
if (!q) return responder(resposta.erro_c
textoo = body.slice(8)
kkk = await fetchJson(`https://kanza-api.herokuapp.com/api/download/ytplaymp3?query=${textoo}&apikey=3DJntssGUjgKbkOIkKJuQ6ckg`)
satoru.sendMessage(m.chat, { audio: { url: kkk.result.result}, mimetype: 'audio/mpeg'},{ quoted: m})
break   */
        case "play":
        case "song":
        case "ytplay":
          {
            if (!text) return responder(`Ex: ${prefix + command} Stay`);
            let yts = require("yt-search");
            let search = await yts(text);
            texto = body.slice(5);
            let anu = search.videos.shift();
            let buttons = [
              {
                buttonId: `playmp3 ${texto}`,
                buttonText: { displayText: "ÁUDIO 🎶" },
                type: 1,
              },
              {
                buttonId: `playvideo ${texto}`,
                buttonText: { displayText: "VÍDEO 📽️" },
                type: 1,
              },
            ];
            let buttonMessage = {
              image: { url: anu.thumbnail },
              caption: `
📜 *Título:* ${anu.title}
🎼 *Ext:* Search
🆔 *ID:* ${anu.videoId}
⌛ *Duração:* ${anu.timestamp}
👀 *Views:* ${anu.views}
📅 *Publicado:* ${anu.ago}
💻 *Autor:* ${anu.author.name}
👽 *Canal:* ${anu.author.url}
✍️ *Descrição:* ${anu.description}
⚙️ *Url:* ${anu.url}`,
              footer: satoru.user.name,
              buttons: buttons,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessage, { quoted: m });
          }
          break;
        case "ytmp3":
          if (!q) return responder(resposta.erro_c);
          if (!isUrl(args[0]) && !args[0].includes("youtu.be"))
            return responder("Preciso de um link que seja do youtube!");
          YTdlMp3(q).then(async (anu) => {
            responder(resposta.wait);
            let txt = `*----「 YOUTUBE MP 」----*\n\n`;
            txt += `*📄 Título :* ${anu.título}\n`;
            txt += `*🎞️ Canal :* ${anu.canal}\n`;
            txt += `*👁️ visualizações :* ${anu.visualizações}\n`;
            txt += `*⏱️ Publicado :* ${anu.publicado}\n`;
            txt += `*Aguarde estou processando o download...*`;
            buffer = await getBuffer(anu.thumb);
            satoru.sendMessage(m.chat, {
              audio: await getBuffer(anu.link),
              mimetype: "audio/mp4",
              filename: `${anu.title}.mp3`,
              quoted: m,
            });
          });
          break;
        case "playvideo":
          if (!q) return responder(resposta.erro_c);
          ytPlayMp4(q).then(async (i) => {
            responder(resposta.wait);
            buffer = await getBuffer(i.url);
            satoru.sendMessage(
              m.chat,
              { video: { url: i.url }, mimetype: "video/mp4" },
              { quoted: m }
            );
          });
          break;

        case "map":
          if (!q)
            return responder(
              `Onde está o texto??\nExemplo ${prefix}map São Paulo`
            );
          responder(resposta.wait);
          data = await fetchJson(
            `https://mnazria.herokuapp.com/api/maps?search=${text}`
          );
          satoru.sendMessage(
            m.chat,
            { image: { url: data.gambar }, caption: `resultado de: ${text}` },
            { quoted: m }
          );
          break;
        case "google":
          {
            if (!text) return responder(`ex: : ${prefix + command} kamaitachi`);
            let google = require("google-it");
            google({ query: text }).then((res) => {
              let teks = `Google Search: ${text}\n\n`;
              for (let g of res) {
                teks += `⭔ *📜 Título* : ${g.title}\n`;
                teks += `⭔ *✍️ Desc* : ${g.snippet}\n`;
                teks += `⭔ *🔗 Link* : ${g.link}\n\n────────────────────────\n\n`;
              }
              responder(teks);
            });
          }
          break;
        case "anime":
          {
            if (!text) return responder(`Que anime você está procurando??`);
            await responder(resposta.wait);
            dgxeon
              .Anime(q)
              .then(async (data) => {
                let txt = `*-------「 ANIME-SEARCH 」-------*\n\n`;
                for (let i of data) {
                  txt += `*📫Título :* ${i.judul}\n`;
                  txt += `*📚 Url :* ${i.link}\n-----------------------------------------------------\n`;
                }
                let gam = await getBuffer(
                  data[0].thumbnail.replace("https://www.anime-planet.com", "")
                );
                var but = [
                  {
                    urlButton: {
                      displayText: "Watch🎥",
                      url: `${myweb}`,
                    },
                  },
                ];
                await satoru.send5ButLoc(
                  from,
                  txt,
                  `© ${ownername}`,
                  gam,
                  but,
                  { userJid: m.chat, quoted: m }
                );
              })
              .catch((err) => {
                responder(resposta.error);
              });
          }
          break;
        case "pinterest":
          {
            responder(resposta.wait);
            anu = await pinterest(text);
            result = anu[Math.floor(Math.random() * anu.length)];
            let buttons = [
              {
                buttonId: `pinterest ${text}`,
                buttonText: { displayText: "Proxima " },
                type: 1,
              },
            ];
            let buttonMessage = {
              image: { url: result },
              caption: `*-------「 PINTEREST 」-------*
🤠 *Pesquisa* : ${text}
🔗 *Url de Mídia* : ${result}`,
              footer: satoru.user.name,
              buttons: buttons,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessage, { quoted: m });
          }
          break;
        case "gimage":
          {
            if (!text) return responder(`ex: : ${prefix + command} vmz`);
            let gis = require("g-i-s");
            gis(text, async (error, result) => {
              n = result;
              images = n[Math.floor(Math.random() * n.length)].url;
              let buttons = [
                {
                  buttonId: `gimage ${text}`,
                  buttonText: { displayText: "Proxima " },
                  type: 1,
                },
              ];
              let buttonMessage = {
                image: { url: images },
                caption: `*-------「 GIMAGE SEARCH 」-------*\n
🤠 *Pesquisa* : ${text}
🔗 *Url de Mídia* : ${images}`,
                footer: satoru.user.name,
                buttons: buttons,
                headerType: 4,
              };
              satoru.sendMessage(m.chat, buttonMessage, { quoted: m });
            });
          }
          break;
        case "tourl":
          {
            responder(resposta.wait);
            let media = await satoru.downloadAndSaveMediaMessage(quoted);
            if (/image/.test(mime)) {
              let anu = await TelegraPh(media);
              responder(util.format(anu));
            } else if (/video/.test(mime)) {
              let media = await satoru.downloadAndSaveMediaMessage(quoted);
              let anu = await TelegraPh(media);
              responder(util.format(anu));
            }
            await fs.unlinkSync(media);
          }
          break;
        case "tinyurl":
          if (!text)
            return responder(
              `Texto?\n\nEx : ${
                prefix + command
              } https://akame-apii.herokuapp.com/`
            );
          try {
            link = args[0];
            anu = await axios.get(
              `https://tinyurl.com/api-create.php?url=${link}`
            );
            responder(`${anu.data}`);
          } catch (e) {
            emror = String(e);
            responder(`${e}`);
          }
          break;

        case "listblockcmd":
          try {
            teks = "*🚫 A lista de comandos bloqueado são: 🚫*\n";
            for (i = 0; i < blockcmd.length; i++) {
              teks += `❧ ${blockcmd[i]}\n`;
            }
            responder(teks);
          } catch {
            responder("algo deu errado");
          }
          break;

        case "blockcmd":
          try {
            if (!isCreator && !m.key.fromMe) return responder(resposta.owner);
            if (args.length < 1)
              return responder("*Bloquear com que comando?*");
            if (isCmdBlocked(args[0]))
              return responder("*Já esta incluso essa palavra*");
            cmdblockk = args[0];
            blockcmd.push(cmdblockk);
            fs.writeFileSync("./src/blockcmd.json", JSON.stringify(blockcmd));
            responder("*✅ Comando bloqueado com sucesso ✅*");
          } catch {
            responder("algo deu errado");
          }
          break;
        case "unblockcmd":
          try {
            if (!isCreator && !m.key.fromMe) return responder(resposta.owner);
            if (args.length < 1) return responder("*Cade a palavra animal*");
            if (!isCmdBlocked(args[0]))
              return responder("*Não esta incluso essa palavra*");
            ind = blockcmd.indexOf(args[0]);
            blockcmd.splice(ind, 1);
            fs.writeFileSync("./src/blockcmd.json", JSON.stringify(blockcmd));
            responder(`*✔️ Comando ${args[0]} desbloqueado com sucesso*`);
          } catch {
            responder("algo deu errado");
          }
          break;
        ////////////////////////////////////////////
        /////////////////////PREMIUM///////////////
        //////////////////////////////////////////

        case "addpremium":
        case "addprem":
          {
            if (!isCreator) return responder(resposta.owner);
            usuario = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            i_nfo = premium.checkPremiumUser(usuario, _premium);
            if (i_nfo) return responder(`Este usuário ja e premium`);
            premium.addPremiumUser(usuario, q, _premium);
            responder(`*「 PREMIUM ADICIONADO 」*\n\n*ID*: ${usuario}\n`);
          }
          break;

        ////////////////////////////////////////////
        //////////////////CANVAS/////////////////////
        ////////////////////////////////////////////
        case "wasted":
        case "rip":
        case "beautiful":
        case "jail":
        case "borro":
        case "dripp":
        case "gun":
        case "triggered":
        case "comunismo":
        case "lgbt":
        case "procurado":
        case "circle":
          {
            let { TelegraPh } = require("./lib/uploader");
            if (!/image/.test(mime))
              return responder(
                `Envie/Responda uma imagem com: ${prefix + command}`
              );
            responder(resposta.wait);
            mee = await satoru.downloadAndSaveMediaMessage(quoted);
            mem = await TelegraPh(mee);
            meme = `https://api-exteam.herokuapp.com/api/${command}?img=${mem}`;
            memek = await satoru.sendImageAsSticker(m.chat, meme, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(memek);
          }
          break;

        //////////////////////////////////////////////
        ////TEXPRO LOGOS by brunoww///////////////////
        /////////////////////////////////////////////

        case "wolf":
        case "wolf2":
        case "urso":
        case "ninjalogo":
        case "leao":
        case "vingadores":
        case "marvel":
        case "thor":
        case "capitaoamerica":
        case "pornhub":
        case "space":
          {
            var texto = args[0];
            var texto2 = args[1];
            if (!texto || !texto2)
              return responder(
                ` Você precisa enviar dois textos para esse utilizar esse comando!! \n\n *Exemplo: *${
                  prefix + command
                } Satoru Gojo`
              );
            teste = `https://satoru-api.herokuapp.com/api/textpro/${command}?text=${texto}&text2=${texto2}apikey=APIKEY`;
            console.log(teste);
            satoru.sendMessage(
              m.chat,
              {
                image: {
                  url: `https://satoru-api.herokuapp.com/api/textpro/${command}?text=${texto}&text2=${texto2}&apikey=APIKEY`,
                },
                caption: `\*Text Pro:\* ${command}`,
              },
              { quoted: m }
            );
          }
          break;
        case "joker":
        case "urso":
        case "holograpic":
        case "blackpink":
        case "harrypotter":
        case "verao":
        case "1917":
        case "devil":
        case "thunder2":
          if (!q) return responder(`use *pornhub tetxo1 + texto2`);
          texto = args[0];
          api = `https://satoru-api.herokuapp.com/api/textpro/${command}=${texto}&apikey=${satorukey}`;
          satoru.sendMessage(
            m.chat,
            { image: { url: api.resultado } },
            { quoted: m }
          );
          break;
        ////////////EFEITOS PARA VOZ///////////////
        case "bass":
        case "blown":
        case "deep":
        case "earrape":
        case "fast":
        case "fat":
        case "nightcore":
        case "reverse":
        case "robot":
        case "slow":
        case "smooth":
        case "tupai":
          try {
            let set;
            if (/bass/.test(command))
              set = "-af equalizer=f=54:width_type=o:width=2:g=20";
            if (/blown/.test(command)) set = "-af acrusher=.1:1:64:0:log";
            if (/deep/.test(command)) set = "-af atempo=4/4,asetrate=44500*2/3";
            if (/earrape/.test(command)) set = "-af volume=12";
            if (/fast/.test(command))
              set = '-filter:a "atempo=1.63,asetrate=44100"';
            if (/fat/.test(command))
              set = '-filter:a "atempo=1.6,asetrate=22100"';
            if (/nightcore/.test(command))
              set = "-filter:a atempo=1.06,asetrate=44100*1.25";
            if (/reverse/.test(command)) set = '-filter_complex "areverse"';
            if (/robot/.test(command))
              set =
                "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
            if (/slow/.test(command))
              set = '-filter:a "atempo=0.7,asetrate=44100"';
            if (/smooth/.test(command))
              set =
                "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
            if (/tupai/.test(command))
              set = '-filter:a "atempo=0.5,asetrate=65100"';
            if (/audio/.test(mime)) {
              responder(resposta.wait);
              let media = await satoru.downloadAndSaveMediaMessage(quoted);
              let ran = getRandom(".mp3");
              exec(
                `ffmpeg -i ${media} ${set} ${ran}`,
                (err, stderr, stdout) => {
                  fs.unlinkSync(media);
                  if (err) return responder(err);
                  let buff = fs.readFileSync(ran);
                  satoru.sendMessage(
                    m.chat,
                    { audio: buff, mimetype: "audio/mpeg" },
                    { quoted: m }
                  );
                  fs.unlinkSync(ran);
                }
              );
            } else responder(`Marque um áudio usando: *${prefix + command}*`);
          } catch (e) {
            responder(e);
          }
          break;

        ////////////////////////////////////////////
        ////////NSFW COMMANDS by brunoww///////////
        //////////////////////////////////////////
        case "wallpaper18":
          if (!m.isGroup) {
            let buttonis = [
              {
                buttonId: `${command} ${text}`,
                buttonText: { displayText: "Próxima 🤠" },
                type: 1,
              },
            ];
            let buttonMessagek = {
              image: { url: `http://hadi-api.herokuapp.com/api/anime` },
              caption: `aqui está! Por favor, não abuse do comando.`,
              footer: satoru.user.name,
              buttons: buttonis,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessagek, { quoted: m });
          } else {
            if (!isNsfw)
              return responder(
                "Ative o modo nsfw para continuar, utilize o comando nsfw"
              );
            let buttonis = [
              {
                buttonId: `${command} ${text}`,
                buttonText: { displayText: "Próxima 🤠" },
                type: 1,
              },
            ];
            let buttonMessagek = {
              image: { url: `http://hadi-api.herokuapp.com/api/anime` },
              caption: `aqui está! Por favor, não abuse do comando.`,
              footer: satoru.user.name,
              buttons: buttonis,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessagek, { quoted: m });
          }
          break;
        case "nsfwloli":
        case "ahegao":
        case "ass":
        case "bdsm":
        case "blowjob":
        case "cuckold":
        case "ero":
        case "femdom":
        case "foot":
        case "gangbang":
        case "glasses":
        case "hentai":
        case "jahy":
        case "manga":
        case "masturbation":
        case "neko":
        case "orgy":
        case "panties":
        case "pussy":
        case "neko2":
          if (!m.isGroup) {
            let buttonkis = [
              {
                buttonId: `${command} ${text}`,
                buttonText: { displayText: "Próxima 😈" },
                type: 1,
              },
            ];
            let buttonMessagekk = {
              image: {
                url: `https://satoru-api.herokuapp.com/api/nsfw/${command}?apikey=${satorukey}`,
              },
              caption: `aqui está! Por favor, não abuse do comando.`,
              footer: satoru.user.name,
              buttons: buttonkis,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessagekk, { quoted: m });
          } else {
            if (!isNsfw) return responder("o adm nao liberou o hentai 😡");
            let buttonkis = [
              {
                buttonId: `${command} ${text}`,
                buttonText: { displayText: "Próxima 😈" },
                type: 1,
              },
            ];
            let buttonMessagekk = {
              image: {
                url: `https://satoru-api.herokuapp.com/api/nsfw/${command}?apikey=${satorukey}`,
              },
              caption: `aqui está! Por favor, não abuse do comando.`,
              footer: satoru.user.name,
              buttons: buttonkis,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessagekk, { quoted: m });
          }
          break;
        ///////////////////////////////////////////
        ///////////////////ANTIS//////////////////
        /////////////////////////////////////////
        case "nsfw":
          {
            if (!m.isGroup) return responder(`${resposta.group}`);
            if (!isAdmins) return responder(`${resposta.admin}`);
            //if (!isOwner) return responder(ptbr.ownerB())
            if (Number(args[0]) === 1) {
              //if (isNsfw) return responder('❎o NSFW já está ativo no grupo❎')
              nsfw.push(m.chat);
              fs.writeFileSync("./src/nsfw.json", JSON.stringify(nsfw));
              responder("O adm liberou o porno 😳");
            } else if (Number(args[0]) === 0) {
              nsfw.splice(m.chat, 1);
              fs.writeFileSync("./src/nsfw.json", JSON.stringify(nsfw));
              responder("O corno do adm proibiu o porno 😡");
            } else {
              let buttons = [
                {
                  buttonId: "nsfw 1",
                  buttonText: { displayText: "ATIVAR 🙊" },
                  type: 1,
                },
                {
                  buttonId: "nsfw 0",
                  buttonText: { displayText: "DESATIVAR 🐵" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `MODO NSFW`,
                satoru.user.name,
                m
              );
            }
          }
          break;

        case "antilink":
        case "semlink":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isBotAdmins) return responder(resposta.botAdmin);
            if (!isAdmins) return responder(resposta.admin);
            if (q === "on") {
              if (isAntiLink)
                return responder(`O ${command} já estava ativo! 🤦`);
              antilink.push(m.chat);
              fs.writeFileSync("./src/antilink.json", JSON.stringify(antilink));
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!isAntiLink) return responder("Já esta desativado");
              var ini = antilink.indexOf(m.chat);
              antilink.splice(ini, 1);
              fs.writeFileSync("./src/antilink.json", JSON.stringify(antilink));
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;

        case "antidoc":
        case "semdocumento":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isBotAdmins) return responder(resposta.botAdmin);
            if (!isAdmins) return responder(resposta.admin);
            if (q === "on") {
              if (isDoc) return responder(`O ${command} já estava ativo! 🤦`);
              antidoc.push(m.chat);
              fs.writeFileSync("./src/antidoc.json", JSON.stringify(antidoc));
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!isDoc) return responder("Já esta desativado");
              var ini = antidoc.indexOf(m.chat);
              antidoc.splice(ini, 1);
              fs.writeFileSync("./src/antidoc.json", JSON.stringify(antidoc));
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;

        case "antiloc":
        case "semlocalização":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isBotAdmins) return responder(resposta.botAdmin);
            if (!isAdmins) return responder(resposta.admin);
            if (q === "on") {
              if (isLoc) return responder(`O ${command} já estava ativo! 🤦`);
              antiloc.push(m.chat);
              fs.writeFileSync("./src/antiloc.json", JSON.stringify(antiloc));
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!isLoc) return responder("Já esta desativado");
              var ini = antiloc.indexOf(m.chat);
              antiloc.splice(ini, 1);
              fs.writeFileSync("./src/antiloc.json", JSON.stringify(antiloc));
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;

        case "anticon":
        case "semcontato":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isBotAdmins) return responder(resposta.botAdmin);
            if (!isAdmins) return responder(resposta.admin);
            if (q === "on") {
              if (isCon) return responder(`O ${command} já estava ativo! 🤦`);
              anticon.push(m.chat);
              fs.writeFileSync("./src/anticon.json", JSON.stringify(anticon));
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!isCon) return responder("Já esta desativado");
              var ini = anticon.indexOf(m.chat);
              anticon.splice(ini, 1);
              fs.writeFileSync("./src/anticon.json", JSON.stringify(anticon));
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;
        case "anticat":
        case "semcatalogo":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isBotAdmins) return responder(resposta.botAdmin);
            if (!isAdmins) return responder(resposta.admin);
            if (q === "on") {
              if (isCat) return responder(`O ${command} já estava ativo! 🤦`);
              anticat.push(m.chat);
              fs.writeFileSync("./src/anticat.json", JSON.stringify(anticat));
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!isCat) return responder("Já esta desativado");
              var ini = anticat.indexOf(m.chat);
              anticat.splice(ini, 1);
              fs.writeFileSync("./src/anticat.json", JSON.stringify(anticat));
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;
        case "antipv":
        case "antiprivado":
          {
            if (!isCreator) return responder(resposta.owner);
            if (q === "on") {
              if (antipv) return responder(`O ${command} já estava ativo! 🤦`);
              antipv = true;
              responder(`O ${command} foi ativado com sucesso 😎`);
            } else if (q === "off") {
              if (!antipv) return responder("Já esta desativado");
              antipv = false;
              responder(`o ${command} foi desativado 🤝`);
            } else if (!q) {
              let buttons = [
                {
                  buttonId: `${command} on`,
                  buttonText: { displayText: "ATIVAR 🤠" },
                  type: 1,
                },

                {
                  buttonId: `${command} off`,
                  buttonText: { displayText: "DESATIVAR 😐" },
                  type: 1,
                },
              ];
              await satoru.sendButtonText(
                m.chat,
                buttons,
                `Modo ${command}, o que deseja fazer? 🕵️`,
                satoru.user.name,
                m
              );
            }
          }
          break;
        //////////////////////////////////////////////
        ////////////////INTERAÇÕES///////////////////
        ////////////////////////////////////////////
        case "cry":
        case "kill":
        case "hug":
        case "pat":
        case "lick":
        case "kiss":
        case "bite":
        case "yeet":
        case "neko":
        case "bully":
        case "bonk":
        case "wink":
        case "poke":
        case "nom":
        case "slap":
        case "smile":
        case "wave":
        case "awoo":
        case "blush":
        case "smug":
        case "glomp":
        case "happy":
        case "dance":
        case "cringe":
        case "cuddle":
        case "highfive":
        case "shinobu":
        case "megumin":
        case "handhold":
          responder(resposta.wait);
          axios
            .get(`https://api.waifu.pics/sfw/${command}`)
            .then(({ data }) => {
              satoru.sendImageAsSticker(m.chat, data.url, m, {
                packname: global.packname,
                author: global.author,
              });
            });
          break;

        case "abraço":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          satoru.sendText(
            m.chat,
            `Que fofo...💘 você deu um abraço em @${
              mentioned[0].split("@")[0]
            }`,
            m,
            { mentions: [mentioned] }
          );
          data = fs.readFileSync("./arquivos/interação/abraço.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];
          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;
        case "ship":
          if (!m.isGroup) return responder(resposta.group);
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          porq = `${Math.floor(Math.random() * 100)}`;
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/ship.jpg` },
              caption: `segundo meus cálculos, a chance de ambos namorarem é de ${porq}%`,
            },
            { quoted: m }
          );
          break;
        case "tapanaraba":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          sus = `😳 você deu um tapa na raba de @${mentioned[0].split("@")[0]}`;
          satoru.sendText(m.chat, sus, m, { mentions: [mentioned] });
          data = fs.readFileSync("./arquivos/interação/tapab.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];

          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;
        case "beijo":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          sus = `Que fofo... 💘 você deu um beijo  em @${
            mentioned[0].split("@")[0]
          }`;
          satoru.sendText(m.chat, sus, m, { mentions: [mentioned] });
          data = fs.readFileSync("./arquivos/interação/beijo.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];

          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;
        case "tapa":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          pro = ".\n";
          for (let _ of mentioned) {
            pro += `@${_.split("@")[0]}\n`;
          }
          sus = `você deu um tapa em @${mentioned[0].split("@")[0]}`;
          satoru.sendText(m.chat, sus, m, { mentions: [mentioned] });
          data = fs.readFileSync("./arquivos/interação/tapa.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];

          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;
        case "carinho":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          pro = ".\n";
          for (let _ of mentioned) {
            pro += `@${_.split("@")[0]}\n`;
          }
          sus = `Que fofo...💘 você fez carinho  em @${
            mentioned[0].split("@")[0]
          }`;
          satoru.sendText(m.chat, sus, m, { mentions: [mentioned] });
          data = fs.readFileSync("./arquivos/interação/carinho.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];

          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;
        case "chute":
          if (
            m.message.extendedTextMessage === undefined ||
            m.message.extendedTextMessage === null
          )
            return responder("Você precisa mencionar alguém");
          mentioned = m.message.extendedTextMessage.contextInfo.mentionedJid;
          sus = `Eita... você chutou a cara de @${mentioned[0].split("@")[0]}`;
          satoru.sendText(m.chat, sus, m, { mentions: [mentioned] });
          data = fs.readFileSync("./arquivos/interação/chute.js");
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];

          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result }, gifPlayback: true },
            { quoted: m }
          );
          break;

        ///////////////////////////////////////////////
        ///////////////// ANIME///////////////////////
        /////////////////////////////////////////////
        case "waifu":
        case "loli":
          responder(resposta.wait);
          axios.get(`https://api.waifu.pics/sfw/waifu`).then(({ data }) => {
            satoru.sendImage(m.chat, data.url, resposta.success, m);
          });
          break;
        case "owner":
        case "creator":
          {
            satoru.sendContact(m.chat, global.owner, tdono);
          }
          break;

        case "cosplay":
        case "waifu":
        case "waifu2":
        case "shota":
        case "loli":
        case "yotsuba":
        case "shinomiya":
        case "yumeko":
        case "tejina":
        case "chiho":
        case "shizuka":
        case "boruto":
        case "kagori":
        case "kaga":
        case "kotori":
        case "mikasa":
        case "akiyama":
        case "hinata":
        case "minato":
        case "naruto":
        case "nezuko":
        case "yuki":
        case "hestia":
        case "emilia":
        case "itachi":
        case "madara":
        case "sasuke":
        case "deidara":
        case "sakura":
        case "tsunade":
          {
            let botao25 = [
              {
                buttonId: `${command}`,
                buttonText: { displayText: "Proxima " },
                type: 1,
              },
            ];
            let buttonMessage25 = {
              image: {
                url: `https://satoru-api.herokuapp.com/api/anime/${command}?apikey=APIKEY`,
              },
              caption: `Aqui esta!! 😁`,
              footer: satoru.user.name,
              buttons: botao25,
              headerType: 4,
            };
            satoru.sendMessage(m.chat, buttonMessage25, { quoted: m });
          }
          break;
        case "amv":
          data = await getBuffer(`https://pastebin.com/raw/J31uLxv6`);
          jsonData = JSON.parse(data);
          randIndex = Math.floor(Math.random() * jsonData.length);
          randKey = jsonData[randIndex];
          buffer = await getBuffer(randKey.result);
          satoru.sendMessage(
            m.chat,
            { video: { url: randKey.result } },
            { quoted: m }
          );
          break;

        ///////////////////////////////////////////////
        ///////// porcentagem e outros ///////////////
        /////////////////////////////////////////////

        case "pau":
          random = `${Math.floor(Math.random() * 35)}`;
          const tamanho = random;
          //var (isNaN(tamanho))
          if (tamanho < 13) {
            pp = "só a fimose";
          } else if (tamanho == 13) {
            pp = "passou da média😳";
          } else if (tamanho == 14) {
            pp = "passou da média😳";
          } else if (tamanho == 15) {
            pp = "eita, vai pegar manga?";
          } else if (tamanho == 16) {
            pp = "eita, vai pegar manga?";
          } else if (tamanho == 17) {
            pp = "calma man, a mina não é um poço😳";
          } else if (tamanho == 18) {
            pp = "calma man, a mina não é um poço😳";
          } else if (tamanho == 19) {
            pp = "calma man, a mina não é um poço😳";
          } else if (tamanho == 20) {
            pp = "você tem um poste no meio das pernas";
          } else if (tamanho == 21) {
            pp = "você tem um poste no meio das pernas";
          } else if (tamanho == 22) {
            pp = "você tem um poste no meio das pernas";
          } else if (tamanho == 23) {
            pp = "você tem um poste no meio das pernas";
          } else if (tamanho == 24) {
            pp = "você tem um poste no meio das pernas";
          } else if (tamanho > 25) {
            pp = "vai procurar petróleo com isso?";
          }
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/pau.jpg` },
              caption: `Seu pau tem ${random}cm\n\n${pp}`,
            },
            { quoted: mek }
          );
          break;
        case "morte":
        case "death":
          idde = [
            "30",
            "76",
            "90",
            "72",
            "83",
            "73",
            "83",
            "74",
            "92",
            "100",
            "94",
            "48",
            "37",
            "53",
            "63",
          ];
          idade = idde[Math.floor(Math.random() * idde.length)];
          morte = `Pessoas com este nome: ${pushname} \nTendem a morrer aos ${idade} anos de idade.`;
          responder(morte);
          break;
        case "gadometro":
        case "gado":
          var chifre = [
            "ultra extreme gado",
            "Gado-Master",
            "Gado-Rei",
            "Gado",
            "Escravo-ceta",
            "Escravo-ceta Maximo",
            "Gacorno?",
            "Jogador De Forno Livre<3",
            "Mestre Do Frifai<3<3",
            "Gado-Manso",
            "Gado-Conformado",
            "Gado-Incubado",
            "Gado Deus",
            "Mestre dos Gados",
            "Topa tudo por buceta",
            "Gado Comum",
            "Mini Gadinho",
            "Gado Iniciante",
            "Gado Basico",
            "Gado Intermediario",
            "Gado Avançado",
            "Gado Profisional",
            "Gado Mestre",
            "Gado Chifrudo",
            "Corno Conformado",
            "Corno HiperChifrudo",
            "Chifrudo Deus",
            "Mestre dos Chifrudos",
            "Rei do Gado",
          ];
          var gado = chifre[Math.floor(Math.random() * chifre.length)];

          gadop = `${Math.floor(Math.random() * 100)}`;
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/gado.jpg` },
              caption: `Você é:\n\n${gado}`,
            },
            { quoted: m }
          );
          break;
        case "chance":
          var avb = body.slice(7);
          if (args.length < 1)
            return responder(
              `Você precisa digitar da forma correta\nExemplo: ${prefix}chance do Bruno ser um trouxa`
            );
          random = `${Math.floor(Math.random() * 100)}`;
          responder(`A chance ${body.slice(7)}\n\né de... ${random}%`);
          break;
        case "caracoroa":
          if (args.length < 1)
            return responder("exemplo:\n*caracoroa cara\n*caracoroa coroa");
          cararo = ["cara", "coroa"];
          fej = cararo[Math.floor(Math.random() * cararo.length)];
          gg = fej;

          xp = Math.floor(Math.random() * 13) + 3;
          xp1 = `Você ganhou ${xp} em xp`;
          if (
            (fej == "cara" && args == "cara") ||
            (fej == "coroa" && args == "coroa")
          ) {
            var vit = "vitoria";
          } else if (
            (fej == "coroa" && args == "cara") ||
            (fej == "cara" && args == "coroa")
          ) {
            var vit = "derrota";
          }
          if (vit == "vitoria") {
            var tes = "Vitória do jogador";
          }
          if (vit == "derrota") {
            var tes = "A vitória é do ed   😎";
          }
          responder(
            `Escolha do jogador:   ${args}\nResultado:  ${fej}\n\n${tes}`
          );
          if (tes == "Vitória do jogador") {
            responder(xp1);
          }
          satoru.sendMessage(
            m.chat,
            { sticker: { url: `./arquivos/caracoroa.webp` } },
            { quoted: m }
          );
          break;

        case "gay":
          random = `${Math.floor(Math.random() * 100)}`;
          boiola = random;
          if (boiola < 20) {
            bo = "hmm... você é hetero 😔";
          } else if (boiola == 21) {
            bo = "+/- boiola";
          } else if (boiola == 23) {
            bo = "+/- boiola";
          } else if (boiola == 24) {
            bo = "+/- boiola";
          } else if (boiola == 25) {
            bo = "+/- boiola";
          } else if (boiola == 26) {
            bo = "+/- boiola";
          } else if (boiola == 27) {
            bo = "+/- boiola";
          } else if (boiola == 28) {
            bo = "+/- boiola";
          } else if (boiola == 29) {
            bo = "+/- boiola";
          } else if (boiola == 30) {
            bo = "+/- boiola";
          } else if (boiola == 31) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 32) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 33) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 34) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 35) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 36) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 37) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 38) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 39) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 40) {
            bo = "tenho minha desconfiança...😑";
          } else if (boiola == 41) {
            bo = "você é né?😏";
          } else if (boiola == 42) {
            bo = "você é né?😏";
          } else if (boiola == 43) {
            bo = "você é né?😏";
          } else if (boiola == 44) {
            bo = "você é né?😏";
          } else if (boiola == 45) {
            bo = "você é né?😏";
          } else if (boiola == 46) {
            bo = "você é né?😏";
          } else if (boiola == 47) {
            bo = "você é né???";
          } else if (boiola == 48) {
            bo = "você é né?😏";
          } else if (boiola == 49) {
            bo = "você é né?😏";
          } else if (boiola == 50) {
            bo = "você é ou não?🧐";
          } else if (boiola > 51) {
            bo = "você é gay🙈";
          }
          teks = `Você é ${random}% Gay\n\n${bo}`;
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/gay.jpg` },
              caption: `Você é ${random}% Gay\n\n${bo}`,
            },
            { quoted: m }
          );
          break;

        case "gostosa":
          random = `${Math.floor(Math.random() * 100)}`;
          boiola = random;
          if (boiola < 20) {
            bo = "Você é uma tabuaKKKKKKKKKKKKK";
          } else if (boiola == 21) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 23) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 24) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 25) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 26) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 27) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 28) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 29) {
            bo = "mt feikkkkkkkkkkk";
          } else if (boiola == 30) {
            bo = "Palito de picolékkkkkkkkk";
          } else if (boiola == 31) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 32) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 33) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 34) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 35) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 36) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 37) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 38) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 39) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 40) {
            bo = "você é aceitável 🧐";
          } else if (boiola == 41) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 42) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 43) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 44) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 45) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 46) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 47) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 48) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 49) {
            bo = "eu pegava 😳😳😳";
          } else if (boiola == 50) {
            bo = "GOSTOSAKKKKKKKKKKKK";
          } else if (boiola == 51) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 52) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 53) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 54) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 55) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 56) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 57) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 58) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 59) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 60) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 61) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 62) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 63) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 64) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 65) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 66) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 67) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola == 68) {
            bo = "Eita q  gostosakkkkkkkkk 😳";
          } else if (boiola > 69) {
            bo = "quanta gostosura😳";
          }
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/gostosa.jpeg` },
              caption: `Você é ${random}% Gostosa\n\n${bo}`,
            },
            { quoted: m }
          );
          break;
        case "linda":
          random = `${Math.floor(Math.random() * 100)}`;
          boiola = random;
          if (boiola < 20) {
            bo = "ESPELHO QUEBROUKKKKKKKKKKKKK";
          } else if (boiola == 21) {
            bo = "fionakkk";
          } else if (boiola == 23) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 24) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 25) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 26) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 27) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 28) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 29) {
            bo = "mt feikkkkkkkkkkk";
          } else if (boiola == 30) {
            bo = "Dragãokkkkkkkkk";
          } else if (boiola == 31) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 32) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 33) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 34) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 35) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 36) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 37) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 38) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 39) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 40) {
            bo = "Melhor que nada 🧐";
          } else if (boiola == 41) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 42) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 43) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 44) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 45) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 46) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 47) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 48) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 49) {
            bo = "Bonitinha você 😳😳😳";
          } else if (boiola == 50) {
            bo = "GOSTOSAKKKKKKKKKKKK";
          } else if (boiola == 51) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 52) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 53) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 54) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 55) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 56) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 57) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 58) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 59) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 60) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 61) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 62) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 63) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 64) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 65) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 66) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 67) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola == 68) {
            bo = "quer me manipular ss ou nn ? 😡";
          } else if (boiola > 69) {
            bo = "bó casa?😳";
          }
          satoru.sendMessage(
            m.chat,
            {
              image: { url: `./arquivos/linda.jpeg` },
              caption: `Você é ${random}% linda\n\n${bo}`,
            },
            { quoted: m }
          );
          break;
        case "roleta":
          const tiro = ["vazio", "vazio", "vazio", "vazio", "pow", "pow"];
          const figr = ["roleta1", "roleta2", "roleta3"];
          tpa = tiro[Math.floor(Math.random() * tiro.length)];
          tpb = figr[Math.floor(Math.random() * figr.length)];
          if (tpa == "vazio") {
            var morte = "Você teve sorte dessa vez, o tambor estava vazio.";
          } else if (tpa == "pow") {
            var morte = "Tinha uma bala no tambor, POW!";
          }
          if (morte == "Tinha uma bala no tambor, POW!") {
            setTimeout(() => {
              satoru.sendMessage(
                m.chat,
                { sticker: { url: "./arquivos/" + tpb + ".webp" } },
                { quoted: m }
              );
            }, 2100);
          }
          setTimeout(() => {
            responder(morte);
          }, 2300);
          break;

        case "par":
          {
            if (!m.isGroup) return responder(`${resposta.group}`);
            let member = participants.map((u) => u.id);
            let me = m.sender;
            let jodoh = member[Math.floor(Math.random() * member.length)];
            let jawab = `Segundo meus calculos, o par perfeifo para @${
              me.split("@")[0]
            } é: @${jodoh.split("@")[0]} 🙈`;
            let ments = [me, jodoh];
            let buttons = [
              { buttonId: "❤️", buttonText: { displayText: "❤️" }, type: 1 },
            ];
            await satoru.sendButtonText(
              m.chat,
              buttons,
              jawab,
              satoru.user.name,
              m,
              { mentions: ments }
            );
          }
          break;
        case "casal":
          {
            if (!m.isGroup) return responder(`${resposta.group}`);
            let member = participants.map((u) => u.id);
            let orang = member[Math.floor(Math.random() * member.length)];
            let jodoh = member[Math.floor(Math.random() * member.length)];
            let jawab = `FORMADOR DE CASAIS❤️
            segundo meus cálculos, @${orang.split("@")[0]} e @${
              jodoh.split("@")[0]
            } formam um belo casal❤️💖👀`;
            let menst = [orang, jodoh];
            let buttons = [
              { buttonId: "❤️", buttonText: { displayText: "❤️" }, type: 1 },
            ];
            await satoru.sendButtonText(
              m.chat,
              buttons,
              jawab,
              satoru.user.name,
              m,
              { mentions: menst }
            );
          }
          break;
        case "sn":
          const sn = ["sim", "não"];

          gosto = body.slice(3);
          if (args.length < 1)
            return responder(
              `Você deve fazer uma pergunta...\nExemplo: ${prefix}sn O bruno é um preguiçoso?`
            );
          const jawab = sn[Math.floor(Math.random() * sn.length)];
          hasil = `${gosto}\n\nSegundo meus cálculos, eu acredito que... ${jawab}`;
          responder(hasil);
          break;
        case "votar":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isAdmins) return responder(resposta.admin);
            if (m.chat in vote)
              return responder(
                `_Ainda há votação neste bate-papo!_\n\n*${prefix}deletevote* - para excluir votos`
              );
            if (!text)
              return responder(
                `Insira o motivo do voto, exemplo: *${
                  prefix + command
                } ${pushname} é gay?*`
              );
            responder(
              `A votação começou!\n\n*${prefix}upvote* - a favor\n*${prefix}devote* - contra\n*${prefix}delvoto* - para deletar a votação`
            );
            vote[m.chat] = [q, [], []];
            await sleep(1000);
            upvote = vote[m.chat][1];
            devote = vote[m.chat][2];
            teks_vote = `*「 VOTAÇÃO 」*
    
    *Motivo:* ${vote[m.chat][0]}
    
    ┌〔 A FAVOR 〕
    │ 
    ├ Total: ${vote[m.chat][1].length}
    │
    │ 
    └────
    
    ┌〔 CONTRA 〕
    │ 
    ├ Total: ${vote[m.chat][2].length}
    │
    │ 
    └────
    
    *${prefix}delvoto* - Para deletar a votação`;
            let buttonsVote = [
              {
                buttonId: `${prefix}upvote`,
                buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
                type: 1,
              },
              {
                buttonId: `${prefix}devote`,
                buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
                type: 1,
              },
            ];

            let buttonMessageVote = {
              text: teks_vote,
              footer: satoru.user.name,
              buttons: buttonsVote,
              headerType: 1,
            };
            satoru.sendMessage(m.chat, buttonMessageVote);
          }
          break;
        case "upvote":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!(m.chat in vote))
              return responder(
                `_*sem votação neste grupo!*_\n\nUse *${prefix} votação* - para começar a votar`
              );
            isVote = vote[m.chat][1].concat(vote[m.chat][2]);
            wasVote = isVote.includes(m.sender);
            if (wasVote) return responder("Você já votou!!");
            vote[m.chat][1].push(m.sender);
            menvote = vote[m.chat][1].concat(vote[m.chat][2]);
            teks_vote = `*「 VOTE 」*
    
    *Motivo:* ${vote[m.chat][0]}
    
    ┌〔 A FAVOR 〕
    │ 
    ├ Total: ${vote[m.chat][1].length}
    ${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    ┌〔 CONTRA 〕
    │ 
    ├ Total: ${vote[m.chat][2].length}
    ${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    *${prefix}delvoto* - Para deletar a votação`;
            let buttonsUpvote = [
              {
                buttonId: `${prefix}upvote`,
                buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
                type: 1,
              },
              {
                buttonId: `${prefix}devote`,
                buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
                type: 1,
              },
            ];

            let buttonMessageUpvote = {
              text: teks_vote,
              footer: satoru.user.name,
              buttons: buttonsUpvote,
              headerType: 1,
              mentions: menvote,
            };
            satoru.sendMessage(m.chat, buttonMessageUpvote);
          }
          break;
        case "devote":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!(m.chat in vote))
              return responder(
                `_*sem votações neste grupo!*_\n\nuse:*${prefix}votação* - para começar a votar`
              );
            isVote = vote[m.chat][1].concat(vote[m.chat][2]);
            wasVote = isVote.includes(m.sender);
            if (wasVote) return responder("Você já votou!!");
            vote[m.chat][2].push(m.sender);
            menvote = vote[m.chat][1].concat(vote[m.chat][2]);
            teks_vote = `*「 VOTE 」*
    
    *Motivo:* ${vote[m.chat][0]}
    
    ┌〔 A FAVOR 〕
    │ 
    ├ Total: ${vote[m.chat][1].length}
    ${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    ┌〔 DEVOTE 〕
    │ 
    ├ Total: ${vote[m.chat][2].length}
    ${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    *${prefix}delvoto* - Para deletar a votação`;
            let buttonsDevote = [
              {
                buttonId: `${prefix}upvote`,
                buttonText: { displayText: "𝚄𝙿𝚅𝙾𝚃𝙴" },
                type: 1,
              },
              {
                buttonId: `${prefix}devote`,
                buttonText: { displayText: "𝙳𝙴𝚅𝙾𝚃𝙴" },
                type: 1,
              },
            ];

            let buttonMessageDevote = {
              text: teks_vote,
              footer: satoru.user.name,
              buttons: buttonsDevote,
              headerType: 1,
              mentions: menvote,
            };
            satoru.sendMessage(m.chat, buttonMessageDevote);
          }
          break;
        case "cekvote":
          if (!m.isGroup) return responder(resposta.group);
          if (!(m.chat in vote))
            return responder(
              `_*sem votações neste grupo!*_\n\nuse:*${prefix}votação* - para começar a votar`
            );
          teks_vote = `*「 VOTE 」*
    
    *Motivo:* ${vote[m.chat][0]}
    
    ┌〔 A FAVOR 〕
    │ 
    ├ Total: ${upvote.length}
    ${vote[m.chat][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    ┌〔 DEVOTE 〕
    │ 
    ├ Total: ${devote.length}
    ${vote[m.chat][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
    │ 
    └────
    
    *${prefix}delvoto* - Para deletar a votação
    
    
    ©${satoru.user.id}
    `;
          satoru.sendTextWithMentions(m.chat, teks_vote, m);
          break;
        case "delvoto":
        case "delvote":
        case "hapusvote":
          {
            if (!m.isGroup) return responder(resposta.group);
            if (!isAdmins) return responder(resposta.admin);
            if (!(m.chat in vote))
              return responder(
                `_*sem votações neste grupo!*_\n\nuse:*${prefix}votação* - para começar a votar`
              );
            delete vote[m.chat];
            responder("Excluido com sucesso!");
          }
          break;
        case "lisa":
          {
            // by Bruno
            if (!q) return responder(`Exemplo: ${prefix + command} satoru`);
            responder(`Estou fazendo... 🤠`);
            satoru.sendMessage(
              m.chat,
              {
                image: {
                  url: `https://sakatsumi-api.herokuapp.com/api/lisa?text=${text}&apikey=euQ4vkOsZhYr8nHg8mEgpUdXB`,
                },
                caption: `*Comando executado:* ${command}`,
              },
              { quoted: m }
            );
          }
          break;

        ///////////////////////////////////////////////
        ////////////////ATTP/TTP//////////////////////
        ////////////////////////////////////////////

        case "attp":
          if (!q)
            return responder(
              `Coloque o texto\n Exemplo:${prefix}attp ${pushname} gay`
            );
          satoru.sendMessage(
            m.chat,
            {
              sticker: {
                url:
                  "https://hardianto.xyz/api/maker/attp?text=" +
                  encodeURIComponent(text) +
                  "&apikey=hardianto",
              },
            },
            { quoted: fig }
          );
          break;
        case "attp2":
        case "attp3":
        case "attp4":
        case "attp5":
        case "attp6":
          if (!q)
            return responder(
              `Coloque o texto\nExemplo :\n${prefix + command}${pushname} gay`
            );
          satoru.sendMessage(
            m.chat,
            {
              sticker: {
                url: `http://brizas-api.herokuapp.com/ttp/${command}?apikey=${brizaskey}&text=${encodeURIComponent(
                  text
                )}`,
              },
            },
            { quoted: fig }
          );
          break;
        case "ttp2":
        case "ttp3":
        case "ttp4":
        case "ttp5":
        case "ttp6":
          if (!q)
            return responder(
              `Coloque o texto\nExemplo :\n${prefix + command}${pushname} gay`
            );
          satoru.sendMessage(
            m.chat,
            {
              sticker: {
                url: `http://brizas-api.herokuapp.com/ttp/${command}?apikey=${brizaskey}&text=${encodeURIComponent(
                  text
                )}&color=00ffff`,
              },
            },
            { quoted: fig }
          );
          break;
        case "menu1":
          responder("aguarde...");
          templateButtons = [
            {
              index: 1,
              urlButton: {
                displayText: "Criador",
                url: "https://youtube.com/channel/UCc1df-Do_OpYwC_QlTi3vZQ",
              },
            },
            {
              index: 2,
              urlButton: {
                displayText: "Grupo",
                url: "https://chat.whatsapp.com/C5bjoLLAKlcGGWogRakVsB",
              },
            },
          ];

          templateMessage = {
            image: {
              url: "https://telegra.ph/file/2051ec65d3e66f4538c12.jpg",
              quoted: info,
            },
            caption: `
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
┏━━••• *_ADM_* 
┃》${prefix}antilink
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
            footer: "Clover-md",
            templateButtons: templateButtons,
          };
          satoru.sendMessage(from, templateMessage);
          break;

        case "menu2":
          return responder(`

`);

        case "menuadm":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          return responder(`
┏━━••• *_MENUS_* 
┃》${prefix}antilink 
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
`);

        case "cassino":
          //CASSINO
          const soto = [
            "🍊 : 🍒 : 🍐",
            "🍒 : 🔔 : 🍊",
            "🍇 : 🍇 : 🍇",
            "🍊 : 🍋 : 🔔",
            "🔔 : 🍒 : 🍐",
            "🔔 : 🍒 : 🍊",
            "🍊 : 🍋 : ??",
            "🍐 : 🍒 : 🍋",
            "🍐 : 🍐 : 🍐",
            "🍊 : 🍒 : 🍒",
            "🔔 : 🔔 : 🍇",
            "🍌 : 🍒 : 🔔",
            "🍐 : 🔔 : 🔔",
            "🍊 : 🍋 : 🍒",
            "🍋 : 🍋 : 🍌",
            "🔔 : 🔔 : 🍇",
            "🔔 : 🍐 : 🍇",
            "🔔 : 🔔 : 🔔",
            "🍒 : 🍒 : 🍒",
            "🍌 : 🍌 : 🍌",
          ];
          const mining = Math.ceil(Math.random() * 200) + 1;
          const somtoy2 = sotoy[Math.floor(Math.random() * sotoy.length)];
          if (
            somtoy2 == "🥑 : 🥑 : 🥑" ||
            somtoy2 == "🍉 : 🍉 : 🍉" ||
            somtoy2 == "🍓 : 🍓 : 🍓" ||
            somtoy2 == "🍎 : 🍎 : 🍎" ||
            somtoy2 == "🍍 : 🍍 : 🍍" ||
            somtoy2 == "🥝 : 🥝 : 🥝" ||
            somtoy2 == "🍑 : 🍑 : 🍑" ||
            somtoy2 == "🥥 : 🥥 : 🥥" ||
            somtoy2 == "🍋 : 🍋 : 🍋" ||
            somtoy2 == "🍐 : ?? : 🍐" ||
            somtoy2 == "🍌 : 🍌 : 🍌" ||
            somtoy2 == "🍒 : 🍒 : 🍒" ||
            somtoy2 == "🔔 : 🔔 : 🔔" ||
            somtoy2 == "🍊 : 🍊 : 🍊" ||
            somtoy2 == "🍇 : 🍇 : 🍇"
          ) {
            var Vitória = "Você ganhou 🔮";
          } else {
            var Vitória = "Você perdeu...";
          }
          const cassino = `
	©Clover𝐁𝐨𝐭
╔═════☪︎═════╗
┣► ${somtoy2}◄┛
╚═════☪︎═════╝

*${Vitória}*`;
          responder(cassino);
          if (Vitória == "Você ganhou!!!") {
            responder("Parabéns");
          }
          await satoru(sender);
          break;

        case "ban":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          if (
            info.message.extendedTextMessage != undefined ||
            info.message.extendedTextMessage != null
          ) {
            num = info.message.extendedTextMessage.contextInfo.participant;
            cod = fs.readFileSync("./arquivos/audios/ban.mp3");
            satoru.sendMessage(
              from,
              { audio: cod, mimetype: "audio/mp4", ptt: true },
              { quoted: live }
            );
            satoru.groupParticipantsUpdate(from, [num], "remove");
          } else {
            responder("Marque a mensagem do fdp 🤬");
          }
          break;

        case "ping":
          responder(`Ping: ${ping.toFixed(4)} segundos `);
          break;

        case "toimg":
          if (!isQuotedSticker) return responder("Marque uma figurinha!!");
          buff = await getFileBuffer(
            info.message.extendedTextMessage.contextInfo.quotedMessage
              .stickerMessage,
            "image"
          );
          responder(resposta.espere);
          try {
            satoru.sendMessage(from, { image: buff }, { quoted: live });
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;
        case "ppt":
          if (args.length < 1) return responder("Escolha: tesoura/pedra/papel");
          if (args[0] === "tesoura") {
            gunting = [
              `${pushname}: *${args[0]}*\nsatoru: *papel*\nVocê ganhou 😔`,
              `${pushname}: *${args[0]}*\nsatoru: *pedra*\nVocê perdeu 🙂`,
              `${pushname}: *${args[0]}*\nsatoru: *tesoura*\n😏😏`,
            ];
            gun = gunting[Math.floor(Math.random() * gunting.length)];
            responder(gun);
          } else if (args[0] === "papel") {
            ker = [
              `${pushname}: *${args[0]}*\nsatoru: *pedra*\nVocê ganhou 😔`,
              `${pushname}: *${args[0]}*\nsatoru: *tesoura*\nVocê perdeu 🙂`,
              `${pushname}: *${args[0]}*\nsatoru: *papel*\nEmpate 🤨`,
            ];
            kertas = ker[Math.floor(Math.random() * ker.length)];
            responder(kertas);
          } else if (args[0] === "pedra") {
            bat = [
              `${pushname}: *${args[0]}*\nsatoru: *tesoura*\nVocê ganhou 😔`,
              `${pushname}: *${args[0]}*\nsatoru: *papel*\nVocê perdeu 🙂`,
              `${pushname}: *${args[0]}*\nsatoru: *pedra*\nEmpate 🤕`,
            ];
            batu = bat[Math.floor(Math.random() * bat.length)];
            responder(batu);
          } else {
            responder("Escolha: tesoura/pedra/papel");
          }
          break;

        case "clear":
        case "reiniciar":
          satoru.sendMessage(
            from,
            " L I M P A N D U 😎🤙\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nlimpo",
            text,
            { quoted: live }
          );
          break;

        case "perfil":
          try {
            ppimg = await satoru.profilePictureUrl(
              `${sender.split("@")[0]}@c.us`,
              "image"
            );
          } catch (e) {
            ppimg = logo;
          }
          perfil = await getBuffer(ppimg);
          responder(resposta.espere);
          try {
            satoru.sendMessage(
              from,
              {
                image: perfil,
                caption: `
࿐ Aqui está suas informações 

☆ Nome: ${pushname}
☆ Número: ${sender.split("@")[0]}
☆ Wa.me: https://wa.me/${sender.split("@")[0]}
☆ Grupo: ${groupName}
`,
              },
              { quoted: info }
            );
            tujuh = fs.readFileSync("./arquivos/audios/perfil.mp3");
            await satoru.sendMessage(
              from,
              { audio: tujuh, mimetype: "audio/mp4", ptt: true },
              { quoted: info }
            );
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "gplink":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          const link = await satoru.groupInviteCode(from);
          responder(`࿐ Link do grupo : https://chat.whatsapp.com/${link} `);
          break;

        case "resetarlink":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            await satoru.groupRevokeInvite(from);
            responder("࿐ Link de convite resetado com sucesso ✓ ");
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "sair":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          responder(
            "ok...me desculpe se eu nao pude ajudá-lo(a) com o que vc precisava....adeus😔"
          );
          await delay(1000);
          try {
            await satoru.groupLeave(from);
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "rebaixar":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          if (q < 1) return responder("࿐ Digite o número, animal ");
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            satoru.groupParticipantsUpdate(
              from,
              [`${q}@s.whatsapp.net`],
              "demote"
            );
            responder(`࿐ ${q} Foi rebaixado a membro comum com sucesso `);
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "promover":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          if (q < 1) return responder("࿐ Cade o número, mongolóide ");
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            satoru.groupParticipantsUpdate(
              from,
              [`${q}@s.whatsapp.net`],
              "promote"
            );
            responder(`࿐ ${q} Foi promovido a adm com sucesso `);
            kak = fs.readFileSync("./audios/promover.mp3");
            satoru.sendMessage(
              from,
              { audio: kak, mimetype: "audio/mp4", ptt: true },
              { quoted: info }
            );
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "grupo":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            if (q == "a") {
              await satoru.groupSettingUpdate(from, "not_announcement");
              responder("࿐ Grupo aberto com sucesso");
            }
            if (q == "f") {
              await satoru.groupSettingUpdate(from, "announcement");
              responder("࿐ Grupo fechado com sucesso ");
            }
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "infogp":
          if (!isGroup) return responder(resposta.grupo);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          responder(`
📝 Nome : ${groupName}
📃 Descrição : ${groupDesc}
🆔 Id : ${from}
📅 Data : ${data}
🕛 Horário : ${hora}
`);
          break;

        case "mudardk":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            await satoru.groupUpdateDescription(from, `${q}`);
            responder("࿐ Descrição alterada com sucesso ✓ ");
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "mudarnm":
          if (!isGroup) return responder(resposta.grupo);
          if (!groupAdmins) return responder(resposta.adm);
          if (!isBotGroupAdmins) return responder(resposta.botadm);
          try {
            await satoru.groupUpdateSubject(from, `${q}`);
            responder("࿐ Nome alterado com sucesso ✓ ");
          } catch (e) {
            console.log(e);
            responder(resposta.erro);
          }
          break;

        case "listadm":
          if (!isGroup) return responder(resposta.grupo);
          teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`;
          no = 0;
          for (let admon of groupAdmins) {
            no += 1;
            teks += `[${no.toString()}] @${admon.split("@")[0]}\n`;
          }
          mentions(teks, groupAdmins, true);
          break;
        default:
      }
      // Começo dos comandos sem prefix //
      //     /\/\
      //    (° v °)
      //    /|    |\
      //     V---V
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//

      if (budy.match("fofo")) {
        satoru.sendMessage(
          from,
          {
            audio: { url: "./audios/fofo.mp3" },
            mimetype: "audio/mp4",
            ptt: true,
          },
          { quoted: info }
        );
      }

      if (budy.includes("@557598659560")) {
        satoru.sendMessage(from, {
          sticker: fs.readFileSync("./sticker/dono.webp"),
        });
      }

      // Fim dos comandos sem prefix //
      //     /\/\
      //    (° v °)
      //    /|    |\
      //     V---V
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
    } catch (e) {
      console.log(e);
    }
  });
}
startClover();
