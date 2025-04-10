const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const config = require('./config.json');
const keepAlive = require('./keepAlive.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers],
  partials: [Partials.Channel]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[AVISO] O comando ${file} está com "data" ou "execute" faltando.`);
  }
}

const eventosPath = path.join(__dirname, 'eventos');
const eventosArquivos = fs.readdirSync(eventosPath).filter(file => file.endsWith('.js'));

for (const file of eventosArquivos) {
  const evento = require(`./eventos/${file}`);
  if (evento.once) {
    client.once(evento.name, (...args) => evento.execute(...args, client));
  } else {
    client.on(evento.name, (...args) => evento.execute(...args, client));
  }
}


client.on('ready', () => {
  console.log(`🤖 Bot logado como ${client.user.tag}`);

  const atividades = [
    '🪓 Preparando uma invasão viking...',
    '📜 Lendo as runas antigas...',
    '⚔️ Protegendo o reino nórdico...',
    '🛡️ Defendendo Midgard...',
    '❄️ Enfrentando a fúria de Jotunheim...',
    '🧝 Reunindo os clãs de Asgard...',
    '🗡️ Forjando espadas com os anões...',
    '🌌 Navegando pelo Bifrost...',
    '🐺 Fugindo de Fenrir...',
    '🌿 Procurando sabedoria com Yggdrasil...',
    '🔥 Observando o Ragnarok se aproximar...',
    '👁️ Recebendo visões de Odin...',
    '🌙 Meditando com Freya...',
    '🧠 Estratégias com Loki...',
    '🥶 Congelando no Reino de Niflheim...',
    '☀️ Viajando com o Sol puxado por Sleipnir...',
    '🍻 Bebendo hidromel com os deuses...',
    '💬 sussurrando segredos nas florestas encantadas...',
    '🏹 Caçando criaturas míticas...',
    '🔮 Profetizando o destino dos clãs...'
  ];

  let index = 0;

  setInterval(() => {
    const atividadeAtual = atividades[index % atividades.length];

    client.user.setPresence({
      activities: [{ name: atividadeAtual, type: 3 }], // type: 3 = Assistindo
      status: 'online'
    });

    index++;
  }, 1000 * 60 * 5); // a cada 5 minutos
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: '❌ Ocorreu um erro ao executar este comando.', ephemeral: true });
    } else {
      await interaction.reply({ content: '❌ Ocorreu um erro ao executar este comando.', ephemeral: true });
    }
  }
});

keepAlive();
client.login(config.token);
