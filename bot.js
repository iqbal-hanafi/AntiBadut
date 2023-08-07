// * by scp1337 * //

const { Client } = require('discord.js-selfbot-v13');
const { GuildData, TOKEN } = require('./config.js')
console.log(TOKEN, GuildData)
const client = new Client({
   checkUpdate: false
})

var siapDireply = {}
var intervals = {}
var pendingReply = {}

client.on('ready', () => {
  client.guilds.cache.each(guild => {
      const yourGuild = GuildData[guild.name]
      if(yourGuild){
         guild.channels.cache.filter(x => x.type == 'GUILD_CATEGORY').each(category => {
            category.children.filter(x => x.topic === null).each(async (child) => {
               for(cname in yourGuild.channel)
                  if(child.name.includes(cname)){
                     let yguild = yourGuild.channel[cname]
                     if(yguild.bakuReply){
                        pendingReply[yguild.bakuReply] = {}
                        pendingReply[yguild.bakuReply][child.id] = null
                     }
                     if(yguild.reply)
                        siapDireply[child.id]=yguild
                     if(yguild.repeat)
                        intervals[child.id] = setInterval(async ()=>{
                           if(typeof yguild.firstMsg === 'string')
                              child.send(yguild.firstMsg)
                           if(typeof yguild.firstMsg === 'function')
                              child.send(await yguild.firstMsg())
                        }, ((child.rateLimitPerUser+1)*1000))
                     if(typeof yguild.firstMsg === 'string')
                        child.send(yguild.firstMsg)
                     if(typeof yguild.firstMsg === 'function')
                        child.send(await yguild.firstMsg())
                  }
            })
         })
      }
  })
})


client.on('message', async (msg) => {
   var chId = msg.channelId
   var chName = (await client.channels.fetch(chId)).name
   var guildName = (await client.guilds.fetch(msg.guildId)).name
   if(Object.keys(siapDireply).includes(chId)){
      if (msg.type === 'REPLY') {
        const dataReply = await msg.fetchReference()
        if(dataReply.author.username === client.user.username){
            console.log(`[${guildName} - ${chName}] ${msg.author.username}: ${msg.content}`)
            var yguild = siapDireply[chId]
            if(yguild.bakuReply){
               var msgR = pendingReply[yguild.bakuReply][chId]
               if(msgR)
                  msgR.reply(msg.content)
               pendingReply[guildName][
                  Object.keys(pendingReply[guildName])[0]
               ] = msg
            }
            if(typeof yguild.firstMsg === 'string')
               msg.reply(yguild.firstMsg)
            if(typeof yguild.firstMsg === 'function')
               msg.reply(await yguild.firstMsg())
        }
     }
   }
})


client.login(TOKEN)