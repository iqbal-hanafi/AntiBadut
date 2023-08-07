const request = require('request')


const _getRandom = list => {
  return list[Math.floor((Math.random()*list.length))];
}

async function _getQuotesOnePiece(){
   return await new Promise(resv => {
      request.get('https://onepiece.fandom.com/id/wiki/Kumpulan_Kata_Bijak_dan_Mutiara', async (e,r,body) => {
         if(!body)
            return resv(await _getQuotesOnePiece())
         var names = body.matchAll(/(?<=\<p\>\<b\>)(?:[A-Za-z]+)(?=\<\/b\>)/g)
         var quotes = {}
         for(nama of names){
            var quoteList = (body.match(new RegExp(`(?<=${nama[0]}\<\/b\>\n</p>)(.*?)(?=\<\/ul\>)`,'ims'))[0])
            if(quoteList){
               var kata = []
               for(kt of quoteList.replace(/&gt;/g,'').matchAll(/(?<=\<li\>)(.+?)(?=\<\/li\>)/g))
                  kata.push(kt[0])
               quotes[nama]=kata
            }
         }
         resv(quotes)
      })
   })
}


async function randQuoteOnePiece(){
   var quotes = await _getQuotesOnePiece()
   var char = _getRandom(Object.keys(quotes))

   return `${_getRandom(quotes[char])} ~ ${char}`
}

module.exports = randQuoteOnePiece