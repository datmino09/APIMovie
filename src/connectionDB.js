const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_movie', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
    logging: false,
});
const ConnectionDatabase = async () =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
ConnectionDatabase();
module.exports = sequelize;