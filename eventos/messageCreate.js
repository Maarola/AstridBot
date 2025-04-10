const QuickDB = require('quick.db');
const db = new QuickDB.QuickDB();

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const userId = message.author.id;

    const xpGanho = Math.floor(Math.random() * 10) + 5;
    let xpAtual = await db.get(`xp_${userId}`) || 0;
    xpAtual += xpGanho;

    let nivelAtual = await db.get(`nivel_${userId}`) || 1;
    const xpParaProximoNivel = nivelAtual * 100;

    if (xpAtual >= xpParaProximoNivel) {
      xpAtual -= xpParaProximoNivel;
      nivelAtual++;
      await db.set(`nivel_${userId}`, nivelAtual);

      try {
        await message.channel.send(`🧬 ${message.author}, você subiu para o nível **${nivelAtual}**! Parabéns!`);
      } catch (err) {
        console.error('Erro ao enviar mensagem de level up:', err);
      }
    }

    await db.set(`xp_${userId}`, xpAtual);
  }
};
