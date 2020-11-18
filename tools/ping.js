const superagent = require('superagent');

(async function() {
  await superagent.get(process.env.PING_URL)
})();
