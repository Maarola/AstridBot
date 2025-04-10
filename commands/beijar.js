const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Beije alguém 😘')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Quem você quer beijar?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario');

    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: 'Você não pode se beijar... (ou pode? 🤨)',
        ephemeral: true
      });
    }

    const gifs = [
      'https://media.tenor.com/GQ9SS3lVy6QAAAAC/anime-kiss.gif',
      'https://media.tenor.com/3UFCgN5dDTMAAAAC/kiss-anime.gif',
      'https://media.tenor.com/-xI5DNkGmwkAAAAC/anime-couple-kiss.gif',
      'https://media.tenor.com/NzRQZzMLhmcAAAAC/kiss-anime.gif'
    ];

    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    const embed = new EmbedBuilder()
      .setColor('Pink')
      .setTitle('💋 Beijo!')
      .setDescription(`${interaction.user} beijou ${user}!`)
      .setImage(gif);

    await interaction.reply({ embeds: [embed] });
  }
};
