const fs = require('fs');
const musik = require('../controller/lagu.js');
const Discord = require('discord.js');


module.exports = {
    name: 'search',
    description: 'cari lagu nya bang',
	async execute(message, args) {
        const input = args.join(" ");
        const channel = message.member.voice.channel;
        if(!channel)
            return message.reply('Pala kau tak puter');

        const hasilcari = await musik.carilagu(input, 5);

        let strcari = "";
        for(let j = 0; j < hasilcari.length; j++){
            strcari += j+1 + " \`" + hasilcari[j].nama + "\`" + "\n\n";
        }

        const embed = new Discord.MessageEmbed()
            .setTitle("Pilih bang")
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor(0x00AE86)
            .setDescription(strcari)
            .setFooter("Gajawab atletis");

        const filter = m => parseInt(m) < 6;
        message.channel.send(embed ).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time'] })
                .then(async collected => {
                    const addtolist = musik.add(hasilcari[collected.first().content + 1]);
                    console.log(collected.first().content)
                    if( musik.playlist.length > 1) return;
                    const connection = await musik.connect(channel,message);
                    return musik.puter();
                })
                .catch(collected => {
                    message.channel.send('Ngeprank kau ya');
                });
        });

	},

};