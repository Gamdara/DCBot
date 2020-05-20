module.exports = {
    name: 'say',
    aliases: ['bilang','ngomong'],
    description: 'buat aku ngomong',
	async execute(message, args) {
        if (!args.length) return message.channel.send("Hah");
        message.delete();
        message.channel.send(args.join(" "));
	},
};