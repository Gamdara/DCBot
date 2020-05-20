const fs = require('fs');
const musik = require('../controller/lagu.js');
const Discord = require('discord.js');


module.exports = {
    name: 'lirik',
    aliases: ['lyric'],
    description: 'lirik lagu nya bang',
	async execute(message, args) {
        if (!args.length && !musik.playlist.length) return message.channel.send("Cari apa kau cok");

        const input = (!args.length) ? musik.playlist.nama : args.join(" ");
        await musik.searchLyric(input).then(hasilcari => {

            for(let i = 0; i < hasilcari.lirik.length; i += 2000) {
                const toSend = hasilcari.lirik.substring(i, Math.min(hasilcari.lirik.length, i + 2000));
                
                const embed = new Discord.MessageEmbed()
                .setTitle(hasilcari.nama)
                .setColor(0x00AE86)
                .setDescription(toSend)
                .setFooter(message.author.username, message.author.displayAvatarURL());
    
                message.channel.send(embed );
            }
            
        });

	},

};