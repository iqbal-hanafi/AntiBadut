
const randQuoteOnePiece = require('./quote.js')


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

const TOKEN = '<token>'

module.exports = {TOKEN, GuildData}
