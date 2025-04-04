var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _categories = require("./categories");
var _comments = require("./comments");
var _episodes = require("./episodes");
var _movies = require("./movies");
var _users = require("./users");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var episodes = _episodes(sequelize, DataTypes);
  var movies = _movies(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  movies.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(movies, { as: "movies", foreignKey: "category_id"});
  comments.belongsTo(movies, { as: "movie", foreignKey: "movie_id"});
  movies.hasMany(comments, { as: "comments", foreignKey: "movie_id"});
  episodes.belongsTo(movies, { as: "movie", foreignKey: "movie_id"});
  movies.hasMany(episodes, { as: "episodes", foreignKey: "movie_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});

  return {
    admins,
    categories,
    comments,
    episodes,
    movies,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
