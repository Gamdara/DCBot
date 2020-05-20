const musik = require('../controller/lagu.js');

module.exports = {
    name: 'exit',
    aliases: ['leave'],
    description: 'pause bang',
	async execute(message, args) {
        musik.exit();
    },

};