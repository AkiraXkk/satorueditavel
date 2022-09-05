const cfonts = require("cfonts")
const moment = require("moment-timezone")

const banner = cfonts.render(("clover|md"), {
font: "block",
align: "center",
colors: ["blueBright", "cyan"]
})

const getBuffer = (url, options) => new Promise(async (resolve, reject) => { 
options ? options : {}
await axios({method: "get", url, headers: {"DNT": 1, "Upgrade-Insecure-Request": 1}, ...options, responseType: "arraybuffer"}).then((res) => {
resolve(res.data)
}).catch(reject)
})

const getGroupAdmins = (participants) => {
admins = []
for (let i of participants) {
if(i.admin == "admin") admins.push(i.id)
if(i.admin == "superadmin") admins.push(i.id)
}
return admins
}


const time2 = moment().tz('America/Sao_Paulo').format('HH:mm:ss')
if(time2 > "00:00:00"){
var time = 'Boa madruga kkk'
}
if(time2 > "05:30:00"){
var time = 'Bom dia kkk'
}
if(time2 > "12:00:00"){
var time = 'Boa tarde kkk'
}
if(time2 > "19:00:00"){
var time = 'Boa noite kkk'
}
const timee = moment.tz("America/Sao_Paulo").format("HH:mm:ss")

const banner2 = cfonts.render((`${time} ${timee}`), {
font: "console",
align: "center",
})

module.exports = {
banner,
banner2
}