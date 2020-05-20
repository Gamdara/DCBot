const musik = require('../controller/lagu.js');

module.exports = {
    name: 'resume',
    description: 'pause bang',
	async execute(message, args) {
        musik.resume();
	},

};