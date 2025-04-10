const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('destrancar')
    .setDescription('Destranca o canal atual para o @everyone')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const canal = interaction.channel;

    try {
      await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: true
      });

      await interaction.reply({
        content: `🔓 Canal **${canal.name}** destrancado!`,
        flags: 1 << 6
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Erro ao destrancar o canal.',
        flags: 1 << 6
      });
    }
  }
};
