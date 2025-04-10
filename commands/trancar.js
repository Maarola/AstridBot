const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trancar')
    .setDescription('Tranca o canal atual para o @everyone')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // só mods/admins

  async execute(interaction) {

    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: "Você não tem permissão!", ephemeral: true });
    }
    

    const canal = interaction.channel;

    try {
      await canal.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: false
      });

      await interaction.reply({
        content: `🔒 Canal **${canal.name}** trancado! Apenas administradores podem digitar.`,
        flags: 1 << 6
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Ocorreu um erro ao tentar trancar o canal.',
        flags: 1 << 6
      });
    }
  }
};
