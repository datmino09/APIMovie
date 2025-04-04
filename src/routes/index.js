const CatagorieRoute = require("./CategorieRoute");
const MovieRoute = require("./MovieRoute");
const EpisodesRoute = require("./EpisodesRoute");
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require("./RegisterRoute");
const CommentRoute = require("./CommentRoute");
function routes(app) {
  app.use("/categories", CatagorieRoute);
  app.use("/movie", MovieRoute);
  app.use("/episodes", EpisodesRoute);
  app.use("/login",LoginRoute);
  app.use("/register",RegisterRoute);
  app.use("/comment",CommentRoute);
}
module.exports = routes;
