const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limpar')
    .setDescription('Apaga mensagens do canal atual')
    .addIntegerOption(option =>
      option.setName('quantidade')
        .setDescription('Número de mensagens para apagar (1 a 100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {

    if (!interaction.member.permissions.has("Administrator")) {
      return interaction.reply({ content: "Você não tem permissão!", ephemeral: true });
    }
    

    const quantidade = interaction.options.getInteger('quantidade');
    const canal = interaction.channel;

    try {
      const mensagens = await canal.bulkDelete(quantidade, true); // ignora mensagens com +14 dias
      await interaction.reply({
        content: `🧹 Apaguei **${mensagens.size}** mensagens.`,
        flags: 1 << 6 
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Ocorreu um erro ao tentar apagar as mensagens.',
        flags: 1 << 6 
      });
    }
  }
};
