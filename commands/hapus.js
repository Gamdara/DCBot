module.exports = {
    name: 'hapus',
    description: 'hapus pesan',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Pake angka cok');
        }
        else if (amount <= 1 || amount > 100) {
			return message.reply('Hapus aja discord kau');
		}

		message.channel.bulkDelete(amount, false).catch(err => {
			console.error(err);
			message.channel.send('Lah error');
		});
	},

};