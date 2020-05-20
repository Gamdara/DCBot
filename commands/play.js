const fs = require('fs');
const musik = require('../controller/lagu.js');

module.exports = {
    name: 'play',
    description: 'lagu nya bang',
	async execute(message, args) {
        const input = args.join(" ");
        const channel = message.member.voice.channel;
        if(!channel){
            return message.reply('Pala kau tak puter');
        }    

        await musik.carilagu(input).then(hasilcari => {
            const addtolist = musik.add(hasilcari[0]);
        });
        
        if( musik.playlist.length > 1) return;
        
        await musik.connect(channel,message).then(() => {
            musik.puter();
        });
        
	},

};