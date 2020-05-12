module.exports = {
	name: 'reload',
	description: 'Hayoo ngapain',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send('apaan cok');
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send('Sukses bang');
        }
        catch (error) {
			console.log(error);
			message.channel.send('error bang');
		}
	},
};