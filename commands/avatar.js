module.exports = {
    name: 'avatar',
    description: 'ava',
    execute(msg, arg) {
        if (!msg.mentions.users.size) {
            return msg.channel.send(`PP mu: <${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}>`);
        }
        const avatarList = msg.mentions.users.map(user => {
            return `PP ${user.username}' : <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
        });
        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        msg.channel.send(avatarList);
    },
};