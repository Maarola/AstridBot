const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gaymeter')
    .setDescription('Descubra o quão gay alguém é 🌈')
    .addUserOption(option =>
      option.setName('usuario')
        .setDescription('Mencione a pessoa que você quer medir')
        .setRequired(false)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser('usuario') || interaction.user;
    const porcentagem = Math.floor(Math.random() * 101);

    let mensagem = '';
    if (porcentagem < 20) mensagem = 'Hétero nível hard 😎';
    else if (porcentagem < 40) mensagem = 'Tem um pezinho fora do armário 👀';
    else if (porcentagem < 60) mensagem = 'Curioso... 🤔';
    else if (porcentagem < 80) mensagem = 'Colorido e confiante 🌈';
    else mensagem = 'RAINBOW BOSS SUPREMO 🏳️‍🌈🔥';

    const barra = '█'.repeat(Math.floor(porcentagem / 10)) + '░'.repeat(10 - Math.floor(porcentagem / 10));

    const embed = new EmbedBuilder()
      .setTitle(`🌈 GayMeter de ${user.username}`)
      .setDescription(`**${porcentagem}% GAY**\n${barra}\n\n${mensagem}`)
      .setColor(0xff69b4)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));

    await interaction.reply({ embeds: [embed] });
  },
};
