## Anti Badut Club (siap di ban MOD)
## How To Get Token
   ```javascript
      paste this on your console
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
   ```
   credit <a href="https://github.com/hxr404/Discord-Console-hacks">hxr404</a>

## How To Use
   open `config.js`
   setting your `GuildData` and `TOKEN`
   ```bash
   $ npm install .
   $ npm bot.js```

## GuildData
```nodejs
GildData {
   'Robot': ....,
   'Guild Name': {
      channel: {
         'channel name': {
            repeat: true, // or false
            reply: true, // or false
            bakuReply: 'Guild Name', // example: 'Robot' for use from this >
            firstMsg: 'msg', // or function () => {}
         }
      }
   }
}
```