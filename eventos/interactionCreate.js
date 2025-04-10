// eventos/interactionCreate.js

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
      if (!interaction.isButton()) return;
  
      if (interaction.customId === 'botao_verificar') {
        const membro = interaction.member;
  
        // Substitua pelos IDs reais dos cargos que você quer dar
        const cargo1Id = '994364409004687546'; // exemplo: '123456789012345678'
        const cargo2Id = '1011684937340039259';
  
        try {
          await membro.roles.add([cargo1Id, cargo2Id]);
          await interaction.reply({
            content: '✅ Você foi verificado e recebeu acesso ao servidor!',
            flags: 65
          });
        } catch (erro) {
          console.error(erro);
          await interaction.reply({
            content: '❌ Ocorreu um erro ao adicionar os cargos.',
            flags: 65
          });
        }
      }
    }
  };
  