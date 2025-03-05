const comment = require("../../models/comment"); 
const post = require("../../models/post"); 
const auth = require("../../utils/auth"); 

const commentQueries = {
    getCommentsByPost: async ({ postId }) => {
      let comments = await comment.find({ postId }).populate("userId postId");
      return comments.map((comment) => ({
        ...comment._doc,
        user: comment.userId,
        post: comment.postId,
      }));
    },
  };
  
const commentMutations = {
  createComment: async ({ content, token, postId }) => {
    let { userId } = auth(token);
    let createdComment = new comment({ content, userId, postId });
    await createdComment.save();
    let populatedComment = await createdComment.populate("userId postId");
    return {
      ...populatedComment.toJSON(),
      user: populatedComment.userId,
      post: populatedComment.postId,
    };
  },

  updateComment: async ({ content, token, commentId }) => {
    let { userId } = auth(token);
    let updatedComment = await comment
      .findOneAndUpdate({ _id: commentId, userId }, { content }, { new: true })
      .populate("userId postId");
    return {
      ...updatedComment.toJSON(),
      user: updatedComment.userId,
      post: updatedComment.postId,
    };
  },

  deleteComment: async ({ token, commentId }) => {
    let { userId, role } = auth(token);
    if (role == "admin") {
      await comment.findByIdAndDelete(commentId);
      return "Comment deleted successfully";
    } else {
      let deletedComment = await comment.findOneAndDelete({
        _id: commentId,
        userId,
      });
      if (deletedComment) return "Comment deleted successfully";
      else throw new Error("Comment not found or unauthorized");
    }
  },
};
module.exports = { commentQueries, commentMutations };