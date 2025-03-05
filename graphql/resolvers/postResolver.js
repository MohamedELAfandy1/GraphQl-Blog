const post = require("../../models/post");
const user = require("../../models/user");
const auth = require("../../utils/auth");

const postQueries = {
  getAllPosts: async () => {
    let posts = await post.find().populate("userId");
    return posts.map((post) => ({ ...post.toJSON(), user: post.userId }));
  },

  getPostById: async ({ postId }) => {
    let thePost = await post.findById(postId).populate("userId");
    return { ...thePost.toJSON(), user: thePost.userId };
  },

  getPostsByUser: async ({ userId }) => {
    const loggedUser = await user.findOne({ _id: userId });
    if (loggedUser) {
      const posts = await post.find({ userId }).populate("userId"); //posts in default is model but it converted to json (model._doc)
      return posts.map((post) => ({ ...post.toJSON(), user: post.userId })); // Enforce map function to convert post to be json instead of model
      //   return posts.map((post) => ({ ...post._doc, user: post.userId }));// Enforce map function to convert post to be json instead of model
    } else {
      throw new Error("User not found");
    }
  },
};

const postMutations = {
  createPost: async ({ title, content, token }) => {
    const { userId } = auth(token);
    const createdPost = new post({ title, content, userId });
    await createdPost.save();
    return "Post created successfully";
  },

  updatePost: async ({ title, content, token, postId }) => {
    let { userId } = auth(token);
    let updatedPost = await post
      .findOneAndUpdate(
        { _id: postId, userId },
        { title, content },
        { new: true }
      )
      .populate("userId");
    if (updatedPost) return updatedPost;
    else throw new Error("Post not found or unauthorized");
  },

  deletePost: async ({ token, postId }) => {
    let { userId, role } = auth(token);
    if (role == "admin") {
      await post.findByIdAndDelete(postId);
      return "Post deleted successfully";
    } else {
      let deletedPost = await post.findOneAndDelete({ _id: postId, userId });
      if (deletedPost) return "Post deleted successfully";
      else throw new Error("Post not found or unauthorized");
    }
  },
};

module.exports = { postQueries, postMutations };
