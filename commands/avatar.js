const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Ngambil PP orang',
	aliases: ['icon', 'pfp'],
	execute(message) {
		if (!message.mentions.users.size) {
			console.log(message);
			const pesan = new Discord.MessageEmbed()
				.setTitle('PP mu')
				.setColor('#0099ff')
				.setURL(message.author.displayAvatarURL({ dynamic: true }))
				.setImage(message.author.displayAvatarURL({ dynamic: true }));
			message.reply(pesan);
		}
		// console.log(message.mentions.users);
		
		const avatarList = message.mentions.users.map(user => {
			return {
				'username' : user.username,
				'avatar' : user.displayAvatarURL({ dynamic: true })
			}
		});
		
		for(avatar of avatarList.values()){
			console.log(avatar);
			const pesan = new Discord.MessageEmbed()
				.setTitle(`PPnya ${avatar.username}:`)
				.setColor('#0099ff')
				.setImage(avatar.avatar)
				.setURL(avatar.avatar);
			return message.channel.send(pesan);
		}
	},
};