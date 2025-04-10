const { SlashCommandBuilder } = require('discord.js');

// Armazena o estado da proteção (memória temporária)
let antilinkAtivado = false;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antilink')
    .setDescription('Ativa ou desativa o bloqueio de links no chat geral')
    .addBooleanOption(option =>
      option.setName('status')
        .setDescription('Ativar (true) ou desativar (false)')
        .setRequired(true)),

  async execute(interaction) {
    antilinkAtivado = interaction.options.getBoolean('status');

    await interaction.reply({
      content: `🔒 Bloqueio de links foi ${antilinkAtivado ? 'ativado' : 'desativado'}!`,
      flags: 1 << 6
    });
  },

  // Exporta estado para ser usado em outro lugar
  getStatus: () => antilinkAtivado
};
