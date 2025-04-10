const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Veja o avatar de um usuário!')
    .addUserOption(option =>
      option.setName('usuário')
        .setDescription('Selecione o usuário')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuário') || interaction.user;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new EmbedBuilder()
      .setTitle(`🖼️ Avatar de ${user.username}`)
      .setImage(avatar)
      .setColor('#2f3136');

    await interaction.reply({ embeds: [embed] });
  }
};
