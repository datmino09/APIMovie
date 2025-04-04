const sequelize = require("../connectionDB"); 
const initModels = require("./init-models"); 

const db = initModels(sequelize); 

db.sequelize = sequelize; 
db.Sequelize = require("sequelize"); 

module.exports = db; 
