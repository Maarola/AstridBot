const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('Veja o banner de um usuário (caso ele tenha).')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Selecione o usuário')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário') || interaction.user;

    const fetchedUser = await interaction.client.users.fetch(user.id, { force: true });
    const bannerURL = fetchedUser.bannerURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`🎴 Banner de ${fetchedUser.username}`)
      .setColor('#5865F2');

    if (bannerURL) {
      embed.setImage(bannerURL);
    } else {
      embed.setDescription('Este usuário não possui um banner.');
    }

    await interaction.reply({ embeds: [embed] });
  }
};
