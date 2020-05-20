const Discord = require('discord.js');
const dbcon = require('../models/suit.js');

const senjata = ['gunting','batu','kertas'];
const stats = {
    gunting : {menang:"kertas", kalah:"batu", emoji:"\:v:"},
    batu : {menang:"gunting", kalah:"kertas", emoji:"\:fist:"},
    kertas : {menang:"batu", kalah:"gunting", emoji:"\:hand_splayed:"}
}

module.exports = {
    name: 'suit',
    description: 'kuy',
	aliases: ['janken', 'gbk'],
	async execute(message, args) {
        if (!senjata.includes(args[0])) return message.channel.send("aneh aneh kau ya");
        
        const insert = await dbcon.add({
            id: message.author.id,
            nama: message.author.username,
            poin: 0,
        });

        const suitPlayer = args[0];
        const suitBot = message.author.id == 518020971240620052 ? stats[suitPlayer].kalah : message.author.id == 256655935899041793 ? stats[suitPlayer].menang : senjata[Math.floor(Math.round(Math.random() * 2))];

        if (stats[suitPlayer].menang == suitBot) {
            const menang = await dbcon.increment(message.author.id);
        }

        const skor = await dbcon.select(message.author.id);
        const embed = new Discord.MessageEmbed()
            .setTitle("Hasil")
            .addFields(
                { name: `${message.author.username}`, value: `${stats[suitPlayer].emoji}`, inline: true },
                { name: 'DIO', value: `${stats[suitBot].emoji}`, inline: true },
            )
            .setFooter(`Skor ${message.author.username}: ${skor.poin}`)

        return message.channel.send(embed).catch(err => {
			console.error(err);
			message.channel.send('error suit');
        });
        
	},
};