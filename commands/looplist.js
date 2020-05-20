const musik = require('../controller/lagu.js');

module.exports = {
    name: 'looplist',
    description: 'loop list lagu ',
	async execute(message, args) {
        if(!args.length){
            musik.loop = "list";
            message.channel.send("Lumping list");
        } 
        if(args[0] == "stop"){
            musik.loop = false;
            message.channel.send("Stop lumping list");
        } 
        else{
            return message.channel.send("apaan cok");
        }
	},

};