const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

require("./dbConnection");

dotenv.config({ path: "config.env" });
const app = express();

const schema = require("./graphql/schema");

const {
  commentQueries,
  commentMutations,
} = require("./graphql/resolvers/commentResolver");
const {
  userQueries,
  userMutations,
} = require("./graphql/resolvers/userResolver");
const {
  postQueries,
  postMutations,
} = require("./graphql/resolvers/postResolver");

const resolvers = {
  ...userQueries,
  ...postQueries,
  ...userMutations,
  ...postMutations,
  ...commentMutations,
  ...commentQueries,
};

app.use(
  "/graphql",
  graphqlHTTP({ schema, rootValue: resolvers, graphiql: true })
);

app.listen(3002, () => {
  console.log("Listenning on port 3002");
});
