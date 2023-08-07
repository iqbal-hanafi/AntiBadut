
const TOKEN = '<token>'

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

const randQuoteOnePiece = require('./quote.js')
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


module.exports = {TOKEN, GuildData}
