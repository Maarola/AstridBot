const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mito')
    .setDescription('Conta uma curiosidade da mitologia nórdica'),
  async execute(interaction) {
    const mitos = [
      'Odin sacrificou um olho para obter sabedoria no poço de Mimir.',
      'Thor, deus do trovão, é famoso por seu martelo Mjölnir, que sempre retorna à sua mão.',
      'Loki é um deus trapaceiro que causou tanto caos que foi acorrentado com o veneno de uma serpente pingando sobre seu rosto.',
      'Yggdrasil é a Árvore do Mundo que conecta todos os nove reinos da mitologia nórdica.',
      'Ragnarök é a batalha apocalíptica que resultará na morte de muitos deuses e no renascimento do mundo.',
      'Freya é a deusa do amor e da guerra, e metade dos guerreiros mortos em batalha vão para seu salão em vez de Valhalla.',
      'Os deuses nórdicos são divididos em dois clãs: os Aesir e os Vanir.',
      'Os elfos e anões também fazem parte do universo nórdico, habitando reinos próprios como Alfheim e Svartalfheim.',
      'A ponte arco-íris Bifröst conecta Midgard (Terra) a Asgard, o reino dos deuses.',
      'Fenrir, o lobo gigante, é filho de Loki e está destinado a matar Odin durante o Ragnarök.',
      'Sleipnir, o cavalo de Odin, tem oito patas e é considerado o mais rápido dos mundos.',
      'Ymir foi o primeiro ser vivo criado no vazio primordial. De seu corpo surgiu o mundo.',
      'Os vikings acreditavam que morrer sem honra os levava ao mundo sombrio de Helheim.',
      'Tyr perdeu sua mão ao prender Fenrir, o lobo do fim do mundo.',
      'Após o Ragnarök, dois humanos, Líf e Lífthrasir, sobreviverão e repovoarão o mundo.',
      'Jörmungandr, a serpente do mundo, terá uma batalha mortal com Thor no Ragnarök.',
      'Mimir é o guardião da sabedoria e do poço da inteligência. Odin sacrificou um olho para beber dessa fonte.',
      'O tempo nos mundos nórdicos é cíclico, não linear. Sempre há destruição e renascimento.',
      'A teia do destino, chamada Wyrd, é tecida pelas Nornas para todos os seres — até os deuses.',
      'Loki engravidou de um garanhão e deu à luz Sleipnir, o cavalo de Odin.',
      'O mundo começou com dois reinos: Niflheim (gelo) e Muspelheim (fogo).',
      'O gigante de fogo Surtr empunha uma espada flamejante que destruirá os céus no Ragnarök.',
      'Bragi é o deus da poesia e inspiração — os bardos o reverenciavam para criar belas histórias.',
      'A deusa Hel governa o reino dos mortos e é filha de Loki com aparência meio viva, meio morta.',
      'O poço Urdarbrunnr, na base de Yggdrasil, é onde as Nornas moldam o destino dos homens.',
      'Os guerreiros em Valhalla treinam todos os dias, morrem, ressuscitam e banqueteiam à noite.',
      'O deus Heimdall tem sentidos aguçados, podendo ouvir até a grama crescendo.',
      'O deus cego Höðr foi enganado por Loki e matou seu irmão Balder com um ramo de visco.',
      'Os deuses habitam Asgard, uma fortaleza celestial conectada à Terra pela ponte arco-íris Bifröst.',
      'O javali Gullinbursti, de crinas douradas, foi forjado pelos anões e pertence ao deus Freyr.',
      'Thor disfarçou-se de noiva para recuperar seu martelo que havia sido roubado.',
      'Níðhöggr é um dragão que rói as raízes de Yggdrasil, trazendo decadência ao mundo.',
      'Os Vanir eram deuses da fertilidade e prosperidade, que fizeram paz com os Aesir após uma guerra.',
      'O corvo Huginn representa o pensamento de Odin; Muninn, a memória. Eles voam pelo mundo diariamente.',
      'Sigyn, esposa de Loki, segura uma tigela para proteger o marido do veneno que pinga sobre ele.',
      'A runa Algiz representa proteção e é inspirada na mitologia nórdica.',
      'Sif, esposa de Thor, é conhecida por seu cabelo dourado, que foi cortado por Loki e depois recriado por anões.',
      'Freyr deu sua espada mágica para conquistar a giganta Gerðr, ficando vulnerável no Ragnarök.',
      'Os mortos que não iam para Valhalla ou para Freya, iam para Hel, onde reinava a deusa Hel.'
    ];

    const randomMito = mitos[Math.floor(Math.random() * mitos.length)];
    await interaction.reply({ content: `🧠 ${randomMito}` }); // ephemeral true usando flags
  },
};
