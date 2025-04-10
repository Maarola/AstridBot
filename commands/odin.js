const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('odin')
    .setDescription('Receba uma profecia ou mensagem sagrada de Odin.'),
    
  async execute(interaction) {
    const profecias = [
      // Originais
      "Aquele que teme a batalha, jamais empunhará o martelo da vitória.",
      "O sangue dos bravos mancha o chão sagrado de Valhalla.",
      "Até os deuses tremem diante do destino.",
      "Não é a espada que vence a guerra, mas o coração que a empunha.",
      "Odin vê tudo... inclusive sua preguiça, mortal.",
      "O lobo uiva à lua, mas é o silêncio que traz o fim dos tempos.",
      "Quem desafia o destino deve estar pronto para cair com honra.",
      "O corvo sussurra segredos que só os escolhidos podem ouvir.",
      "Seja como o trovão de Thor: poderoso, imprevisível e inevitável.",
      "A morte é apenas o início para os que vivem com glória.",

      // Novas
      "Os ventos gelados carregam a sabedoria dos antigos.",
      "A fúria do guerreiro é o tributo que Odin exige.",
      "Aquele que trai o juramento nunca verá os salões dourados.",
      "Mesmo o machado mais afiado enferruja sem propósito.",
      "A runa marcada no destino não pode ser apagada.",
      "Coragem não é ausência de medo, é enfrentá-lo com honra.",
      "Quando os lobos cantam, os deuses escutam.",
      "A árvore de Yggdrasil observa todos os caminhos.",
      "O herói verdadeiro cai de pé e sorri diante do fim.",
      "O tambor da guerra ecoa no peito dos valentes.",
      "A honra pesa mais que a coroa de qualquer rei.",
      "Não há vitória sem sacrifício, nem glória sem dor.",
      "O dia da batalha é o dia da verdade.",
      "Thor quebra montanhas, mas é Odin quem molda destinos.",
      "A morte não é punição — é passagem.",
      "Cada cicatriz é uma saga escrita na pele.",
      "Os fracos seguem ordens. Os fortes seguem o destino.",
      "As estrelas guiam os filhos do norte.",
      "Quando os deuses se calam, os guerreiros gritam.",
      "A verdade dos homens morre, mas a dos deuses é eterna."
    ];

    const mensagem = profecias[Math.floor(Math.random() * profecias.length)];

    await interaction.reply({
      content: `🔮 **Odin diz:**\n*“${mensagem}”*`
    });
  }
};
