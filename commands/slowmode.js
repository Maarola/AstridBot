const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Define o tempo de espera entre mensagens (modo lento)')
    .addIntegerOption(option =>
      option.setName('segundos')
        .setDescription('Tempo entre mensagens (0 para desativar)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(21600)) // 6 horas
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {

    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: "Você não tem permissão!", ephemeral: true });
    }
    
    
    const tempo = interaction.options.getInteger('segundos');
    const canal = interaction.channel;

    try {
      await canal.setRateLimitPerUser(tempo);
      await interaction.reply({
        content: tempo === 0
          ? '⏱️ Modo lento **desativado** neste canal.'
          : `⏱️ Modo lento definido para **${tempo} segundos** neste canal.`,
        flags: 1 << 6
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Ocorreu um erro ao tentar definir o modo lento.',
        flags: 1 << 6
      });
    }
  }
};
