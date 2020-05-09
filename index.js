const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require('./commands/' + file);

    bot.commands.set(command.name, command);
}

bot.on('ready', ()=>{
	console.log('Hooo kau menghidupkan ku?');
});

bot.on('message', msg=>{
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    if (command.args && !args.length){
        return msg.channel.send('Yang jelas dong');
    }
    try {
        command.execute(msg, args);
    }
    catch (error) {
        console.log(error);
        msg.reply('Lah error');
    }
});

const re = /^[Kk][Aa]+[Ll]/;
const reg = /^[Uu][Tt][Uu]+/;
bot.on('message', msg=>{
	if (re.test(msg) || reg.test(msg)) {
		msg.channel.send('Fujoooo');
    }
    if (msg.content === 'ZA') {
		msg.reply('WARUDO');
	}
});

bot.login(token);