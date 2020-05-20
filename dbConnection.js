const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
	

module.exports = {
	connect(){
		try {
			sequelize.authenticate();
			console.log('Connection has been established successfully.');
		  } catch (error) {
			console.error('Unable to connect to the database:', error);
		  }	
		commandFiles = fs.readdirSync('./models').filter(file => file.endsWith('.js'));
		
		for (file of commandFiles) {
			command = require(`./models/${file}`);
		}
		command.define();
		command.sync();
	},

}
