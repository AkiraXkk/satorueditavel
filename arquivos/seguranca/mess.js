const emojiFunction = "︎︎⚠︎"
const fs = require('fs');

const infos = JSON.parse(fs.readFileSync('./cache/dono.json'))
var {p, OwnerNumber, SeuNome} = infos

const messResp = ["[ ! ] Aguarde amigo, estou fazendo...", "Vai beber uma água, ja estou terminando de enviar..", "㋡ Opa, calma ae, tô enviando já!!", "❬❗❭ Aguarde 5 segundos", "☬ Seu pedido é uma ordem companheiro(a), Enviando...", "ههههه𓅂 Oi filho de Deus, calma ae, tô terminando de fazer..", "Oi princesa, já estou preparando pra enviar, Aguarde..", "Salve mano, só aguarde um pouquinho que já estou enviando!!", "Aquieta o coração amigo, já estou enviando!", "Espere sentado que estou enviando!", "Pisa no freio aí amigo, tô enviando já!", "Foi daqui que pediram comando? Ta chegando...", "Oq vc ñ pede chorando, que eu não faço sorrindo, enviando já!", "Em 365 dias úteis termino o comando kkkk meme, to enviando!", "Não precisa gritar, já ouvi e tô enviando seu pedido!", "Aproveita que tô terminando aqui e beba água, hidrate-se!", "Seu pedido é uma ordem, terminando patrão!", "Manda quem pode, obedece quem tem juízo. Já tô enviando...", "Jaja está na mão amigo, aguarde um instante!", "Quem espera, sempre alcança","Tô enviando já amigão!"]
const sexoMess = messResp[Math.floor(Math.random() * messResp.length)] 

exports.commandUsed = () => {
return sexoMess;
}

exports.levelOff = () => {
return "❌ *_...Leveis não está ativado..._*❌";
}
//levelOff

exports.noMonkey = () => {
return "*_❌ Comando privado para meu dono ❌_*";
}
//noMonkey

exports.menuWithRr = () => {
return `*_❌ ERRO ENCONTRADO NO MENU ❌_*\n\n*_🗣️ Tente de novo mais tarde_*`;
}
//menuWithRr

exports.functionOff = (comando) => {
return `*_${emojiFunction} Função ${comando} desativado com sucesso!_*`;
}
//functionOff

exports.functionOn = (comando) => {
return `*_${emojiFunction} Função ${comando} ativado com sucesso!_*`;
}
//functionOn

exports.chooseTheType = () => {
return `*_${emojiFunction} Escolha entre as 3 opções!_*`;
}
//chooseTheType
