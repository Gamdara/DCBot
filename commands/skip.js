const musik = require('../controller/lagu.js');

module.exports = {
    name: 'skip',
    aliases: ['sekip'],
    description: 'sekip bang',
	async execute(message, args) {
        musik.skip();
	},

};