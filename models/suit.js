const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
	
module.exports = {
	define(){
		return this.suit = sequelize.define('suit', {
			id: {
				type: Sequelize.STRING,
				unique: true,
				primaryKey: true,
			},
			nama: Sequelize.TEXT,
			poin: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false,
			},
		});
	},
	sync(){
		this.suit.sync();
	},
	async add(array){
		return await this.suit.findOrCreate({
			where: { id: array.id },
			defaults: array
		  });
    },
    async increment(key){
        return await this.suit.increment('poin', { where: {id : key} });
    },
	async select(key){
		return await this.suit.findByPk(key);
	},

}
