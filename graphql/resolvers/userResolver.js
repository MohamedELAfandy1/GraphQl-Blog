const user = require("../../models/user");
const auth = require("../../utils/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userQueries = {
  getAllUsers: async ({ token }) => {
    const { role } = auth(token);
    if (role == "admin") {
      return await user.find();
    } else {
      throw new Error("Unauthorized");
    }
  },

  getUserById: async ({ id }) => {
    const loggedUser = await user.findOne({ _id: id }).populate("posts");
    if (loggedUser) {
      return loggedUser;
    } else {
      throw new Error("User not found");
    }
  },
};
const userMutations = {
  signUp: async ({ registrationInput }) => {
    const { name, email, password } = registrationInput;
    const existingUser = await user.findOne({ email });
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = new user({ name, email, password: hashedPassword });
    await userCreated.save();

    return userCreated;
  },

  login: async ({ email, password }) => {
    const loggedUser = await user.findOne({ email });
    const isPasswordTrue = await bcrypt.compare(password, loggedUser.password);
    if (loggedUser && isPasswordTrue) {
      const token = jwt.sign(
        { userId: loggedUser._id, role: loggedUser.role },
        process.env.JWT_SECRET_KEY
      );
      return token;
    } else {
      throw new Error("Invalid Email Or Password");
    }
  },
};

module.exports = { userQueries, userMutations };