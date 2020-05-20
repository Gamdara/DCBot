const musik = require('../controller/lagu.js');

module.exports = {
    name: 'loop',
    description: 'loop lagu sekarang ',
	async execute(message, args) {
        if(!args.length){
            musik.loop = "lagu";
            return message.channel.send("Lumping");
        } 
        if(args[0] == "stop"){
            musik.loop = false;
            return message.channel.send("Stop lumping");
        } 
            return message.channel.send("apaan cok");
	},

};