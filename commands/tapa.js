const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slap')
    .setDescription('Dê um tapa em alguém 👋')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Quem você quer dar um tapa?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');

    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: 'Você está tentando se bater? 😵',
        ephemeral: true
      });
    }

    const gifs = [
      'https://media.tenor.com/2rlbp_b2k6QAAAAC/anime-slap.gif',
      'https://media.tenor.com/RX8mZ2sA77wAAAAC/slap.gif',
      'https://media.tenor.com/4oR3e6C3SxUAAAAC/slap-anime.gif',
      'https://media.tenor.com/T-0IoW4xY-QAAAAC/slap-anime.gif'
    ];

    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('👋 TAPA!')
      .setDescription(`${interaction.user} deu um tapa em ${user}!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  }
};
