const fs = require('fs');
const ytdl = require('ytdl-core');
require('puterLagu.js');

module.exports = {
    name: 'play',
    aliases: ['pause', 'stop','resume','exit'],
    description: 'lagu nya bang',
	async execute(message, args) {
        const channel = message.member.voice.channel;
        if(!channel){
            return message.reply('Pala kau tak puter');
        }    
        
        const musik = new puterLagu(channel);

        if (message.content.startsWith('-play')){
            musik.play(args[0]);
            message.channel.send("Jedug Jedes " + args[0]);
        }
        else if (message.content.startsWith('-pause')){
            musik.pause();
            message.channel.send('Paus');
        }
        else if (message.content.startsWith('-stop')){
            musik.stop();
            message.channel.send('Setop')
        }
        else if (message.content.startsWith('-resume')){
            musik.resume();
            message.channel.send('Lanjot')
        }
        else if (message.content.startsWith('-exit')){
            musik.exit();
            message.channel.send('Suud');
        }
		
	},

};