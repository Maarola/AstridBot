const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banir')
    .setDescription('Bane um membro do servidor')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Usuário para banir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo do banimento')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('dias')
        .setDescription('Dias de mensagens a apagar (0–7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const usuario = interaction.options.getUser('usuario');
    const motivo = interaction.options.getString('motivo') || 'Nenhum motivo informado';
    const dias = interaction.options.getInteger('dias') ?? 0;

    const membro = interaction.guild.members.cache.get(usuario.id);

    if (!membro) {
      return await interaction.reply({
        content: '❌ Não encontrei esse membro no servidor.',
        ephemeral: true
      });
    }

    if (!membro.bannable) {
      return await interaction.reply({
        content: '🚫 Não posso banir esse membro (talvez ele seja admin ou tenha cargo acima do bot).',
        ephemeral: true
      });
    }

    try {
      await membro.ban({ deleteMessageDays: dias, reason: motivo });

      await interaction.reply({
        content: `🔨 ${usuario.tag} foi banido.\n📄 Motivo: ${motivo}\n🗑️ Apagando ${dias} dias de mensagens.`,
        ephemeral: false
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Erro ao tentar banir o usuário.',
        ephemeral: true
      });
    }
  }
};
