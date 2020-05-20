const musik = require('../controller/lagu.js');

module.exports = {
    name: 'pause',
    description: 'pause bang',
	async execute(message, args) {
        musik.pause();
	},

};