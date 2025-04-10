const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const ms = require('ms'); // <--- instale com: npm i ms

module.exports = {
  data: new SlashCommandBuilder()
    .setName('castigo')
    .setDescription('Coloca um usuário de castigo (timeout)')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Usuário para punir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('tempo')
        .setDescription('Ex: 10s, 5m, 1h, 1d, 1w (máx: 28d)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('motivo')
        .setDescription('Motivo do castigo')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const usuario = interaction.options.getUser('usuario');
    const tempo = interaction.options.getString('tempo');
    const motivo = interaction.options.getString('motivo') || 'Nenhum motivo informado';
    const membro = interaction.guild.members.cache.get(usuario.id);

    if (!membro) {
      return await interaction.reply({ content: '❌ Usuário não encontrado.', ephemeral: true });
    }

    const milissegundos = ms(tempo);
    if (!milissegundos || milissegundos > 28 * 24 * 60 * 60 * 1000) {
      return await interaction.reply({
        content: '⏳ Tempo inválido. Use até **28d** (dias), ex: `10s`, `5m`, `1h`, `2d`.',
        ephemeral: true
      });
    }

    try {
      await membro.timeout(milissegundos, motivo);

      await interaction.reply({
        content: `⛔ ${usuario.tag} foi colocado de castigo por **${tempo}**!\n📝 Motivo: ${motivo}`,
        ephemeral: false
      });
    } catch (erro) {
      console.error(erro);
      await interaction.reply({
        content: '❌ Erro ao aplicar o castigo. Verifique permissões.',
        ephemeral: true
      });
    }
  }
};
