const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const config = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[AVISO] O comando ${file} está com "data" ou "execute" faltando.`);
  }
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
  try {
    console.log('📡 Registrando comandos...');
    await rest.put(
      Routes.applicationCommands(config.clientId),
      { body: commands },
    );
    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
