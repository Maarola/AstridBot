const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

const niveis = [
  'Aprendiz de Asgard',
  'Guerreiro de Midgard',
  'Valquíria de Batalha',
  'Jarl do Norte',
  'Berserker',
  'Guardião de Yggdrasil',
  'Filho(a) de Odin',
  'Deus(a) Nórdico(a) Supremo'
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Mostra os 10 guerreiros mais poderosos do servidor.'),

  async execute(interaction) {
    const guildId = interaction.guild.id;

    const allData = await db.all();
    const filtered = allData.filter(entry => entry.id.startsWith(`xp_${guildId}_`));
    const sorted = filtered.sort((a, b) => b.value - a.value).slice(0, 10);

    const leaderboard = await Promise.all(
      sorted.map(async (entry, index) => {
        const userId = entry.id.split('_')[2];
        const xp = entry.value;
        const level = Math.floor(xp / 100);
        const titulo = niveis[Math.min(level, niveis.length - 1)];
        let user;

        try {
          user = await interaction.client.users.fetch(userId);
        } catch (err) {
          user = { username: "Usuário desconhecido" };
        }

        return `**${index + 1}. ${user.username}** — Nível ${level} (${titulo}) - ${xp} XP`;
      })
    );

    const embed = new EmbedBuilder()
      .setTitle('🏆 Ranking Nórdico')
      .setColor('#ffd700')
      .setDescription(leaderboard.join('\n') || 'Ninguém começou a jornada ainda...')
      .setFooter({ text: 'Mostrando os mais bravos guerreiros!' });

    await interaction.reply({ embeds: [embed] });
  }
};
