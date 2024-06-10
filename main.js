const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// 클라이언트 객체 생성
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

console.log(`commandFolders: ${commandFolders}`);
// utility


// 각 폴더를 탐색하여 명령어 파일을 로드
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	console.log('commandsPath'+commandsPath)
	// ...\Bot\commands\utility

	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// readdirSync로 읽은 경로에 존재하는 모든 파일을 모두 표시, filter로 js로 끝나는파일만
	// commandFiles에 넣음.

	console.log(commandFiles);
	// [ 'ping.js', 'server.js', 'user.js' ]

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		// path.join 여러개의 경로를 하나의 경로로 합쳐줌.
		console.log(filePath);
		// ...\utility\ping.js, ...\utility\server.js .. 등등

		const command = require(filePath);
		console.log(command)
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready, Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);
