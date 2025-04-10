const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verificar')
    .setDescription('Envia a mensagem de verificação'),

  async execute(interaction) {
    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: "Você não tem permissão!", ephemeral: true });
    }
    
    const embed = new EmbedBuilder()
      .setTitle('🕵️ | Verificar')
      .setDescription('Clique no botão para desbloquear os canais')
      .setColor(0x2ecc71); // cor verde

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('botao_verificar')
          .setEmoji('🪪') // o emoji do botão
          .setStyle(ButtonStyle.Success) // botão verde
      );

    await interaction.reply({
      embeds: [embed],
      components: [row]
    });
  }
};
