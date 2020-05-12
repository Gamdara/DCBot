const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'wuwu',
	aliases: ['commands', 'tulung'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\n\`${prefix}help [nama command]\` buat info`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Pc ya ');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('Mo pc tapi gabisa');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('apatu cok');
		}

		data.push(`**Nama:** ${command.name}`);

		if (command.aliases) data.push(`**Nama lain:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Deskripsi:** ${command.description}`);
		if (command.usage) data.push(`**Cara pakai:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3}`);

		message.channel.send(data, { split: true });
	},
};