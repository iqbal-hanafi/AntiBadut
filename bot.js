// * by scp1337 * //

const { Client } = require('discord.js-selfbot-v13');
const randQuoteOnePiece = require('./quote.js')

const TOKEN = '<your token>'

/*** how to get token?
     patse this code to your console in browser

     window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        req => {
          for (const m of Object.keys(req.c)
            .map(x => req.c[x].exports)
            .filter(x => x)) {
            if (m.default && m.default.getToken !== undefined) {
              return copy(m.default.getToken());
            }
            if (m.getToken !== undefined) {
              return copy(m.getToken());
            }
          }
        },
      ]);
      console.log('%cWorked!', 'font-size: 50px');
      console.log(`%cYou now have your token in the clipboard!`, 'font-size: 16px');

      Credit: (https://github.com/hxr404/Discord-Console-hacks)
***/

const client = new Client({
   checkUpdate: false
})

/***
GildData {
   'Robot': ....,
   'Guild Name': {
      channel: {
         'channel name': {
            repeat: true, // or false
            reply: true, // or false
            bakuReply: 'Guild Name', // example: 'Robot' for use from this msg reply in this and repeat -> Robot -> msg -> this guild -> msg -> Robot 🔄 
            firstMsg: 'msg', // or function () => {}
         }
      }
   }
}

***/

const GuildData = {
   'Space Nation': {
      channel: {
         'gm': {
            repeat: true,
            firstMsg: 'gm'
         },
         'bahasa': {
            reply: true,
            repeat: true,
            firstMsg: randQuoteOnePiece,
         }
      }
   }
}

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