const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");
const readline = require("readline-sync");
const setTitle = require("console-title");

console.clear();
setTitle("Discord Rainbow roles | Developed By Udxr#6191")
let token = readline.question("Please enter your discord token (user of bot): ")
let guildID = readline.question("Please enter the server ID (user must be in the server): ")

bot.on("ready", () => {
    console.clear();
    setTitle(`Discord Rainbow roles | Developed By Udxr#6191 | Logged into ${bot.user.tag}`)
    console.log(`Logged into ${bot.user.tag}`)
    console.log("Please type `!startrainbow` inside the server you would like to do it in.")
})

bot.on("message", async message => {
    if(message.guild.id != guildID)return;
    if(message.content == "!startrainbow"){
        message.channel.send(":white_check_mark: Starting rainbow role.")
        let role = message.guild.roles.find(role => role.name === "RAINBOW");
        if(role){
            role.delete()
            await rainbow();
        }

        if(!role){
            rainbow();
        }

        async function rainbow(){
            let rainbowRole = await message.guild.createRole({
                name: 'RAINBOW',
                color: 'RANDOM',
            })
            
            message.member.addRole(rainbowRole.id)
            console.log(`Created the rainbow role! : ${message.guild.name} : ${message.author.tag}`)
    
            setInterval(async function(){
                await rainbowRole.edit({ color: 'RANDOM' })
                console.log("Changed the color of the role.")
            }, config.speed)
        }
    }
})

bot.on("rateLimit", () => {
    console.log("you are being ratelimited!")
})

bot.login(token).catch(err => {
    return console.log(err)
})