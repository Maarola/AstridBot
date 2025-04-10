const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot está vivo!');
});

function keepAlive() {
  app.listen(3000, () => {
    console.log('Servidor KeepAlive ativo');
  });
}

module.exports = keepAlive;
