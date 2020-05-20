const musik = require('../controller/lagu.js');

module.exports = {
    name: 'stop',
    description: 'pause bang',
	async execute(message, args) {
        musik.stop();
	},

};