module.exports = {
    name: 'hapus',
    description: '',
    execute(msg, args) {
        const jumlah = parseInt(args[0]) + 1;
        if (isNaN(jumlah)) {
            return msg.reply('Masukin Jumlah nya');
        }
        else if (jumlah <= 1 || jumlah > 100) {
        return msg.reply('Hapus aja discord kau');
        }
        msg.channel.bulkDelete(jumlah, true).catch(err => {
            console.error(err);
            msg.channel.send('Lah error');
        });
    },
};