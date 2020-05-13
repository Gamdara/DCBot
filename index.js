const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const puterLagu = require('../classes/puterlagu.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('Gabisa dipc om');
	}

	if (command.args && !args.length) {
		let reply = `Maksud kau apa , ${message.author}!`;

		if (command.usage) {
			reply += `\nCara make nya gini: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Spam terosss tunggu lagi ${timeLeft.toFixed(1)} napa`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
    catch (error) {
		console.error(error);
		message.reply('Lah error');
	}
});

client.on('message', message => {
	const kal = /^[Kk]+[Aa]+[Ll]+$/;
	const utu = /^[Uu]+[Tt]+[Uu]+$/;
	const mak = /^[Mm]+[Aa]+[Kk]+$/;

	if (kal.test(message.content) || utu.test(message.content)){
		return message.channel.send('Fujooooo');
	}
	else if(message.author.id == 518020971240620052){
		return message.channel.send('Hai fujo');
	}
	else if(mak.test(message.content)){
		return message.channel.send('Euyyyy');
	}

});

client.login(token);