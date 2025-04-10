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
    .setName('rank')
    .setDescription('Veja seu nível e título nórdico!')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Veja o rank de outro usuário')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário') || interaction.user;
    const guildId = interaction.guild.id;

    // Use await para obter o xp do usuário
    const xp = (await db.get(`xp_${guildId}_${user.id}`)) || 0;
    const level = Math.floor(xp / 100);
    const nextLevelXP = (level + 1) * 100;
    const xpAtual = xp % 100;
    const titulo = niveis[Math.min(level, niveis.length - 1)];

    const embed = new EmbedBuilder()
      .setTitle(`🏅 Rank de ${user.username}`)
      .setColor('#0099ff')
      .addFields(
        { name: 'Nível', value: `${level}`, inline: true },
        { name: 'XP Atual', value: `${xpAtual}/${nextLevelXP - (level * 100)}`, inline: true },
        { name: 'Título Nórdico', value: `${titulo}`, inline: false }
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setFooter({ text: 'Sistema de XP Nórdico' });

    await interaction.reply({ embeds: [embed] });
  }
};
