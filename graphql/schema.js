const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type User {
        id: ID
        name: String!
        email: String
        posts: [Post!]  
    }

    type Post {
        id:ID
        title: String
        content: String
        user: User
    }

    type Comment {
        id:ID
        content: String!
        user: User
        post: Post
    }

    input UserInput {
        name: String!
        email: String!
        password: String!
    }

    type Query {
        getAllUsers(token: String!): [User!]!
        getUserById(id: ID!): User!
        getAllPosts: [Post!]!
        getPostById(postId: ID!): Post!
        getPostsByUser(userId: ID!): [Post!]!
        getCommentsByPost(postId:ID!): [Comment!]!
    }

    type Mutation{ 
        signUp(registrationInput: UserInput): User   
        login(email: String!, password: String!): String

        createPost(title: String!, content: String!, token: String!): String
        updatePost(title: String, content: String, token: String!, postId: ID!): Post
        deletePost(token: String!, postId: ID!): String
        
        createComment(content: String!, token: String!, postId: ID!): Comment
        updateComment(content: String!, token: String!, commentId: ID!): Comment
        deleteComment(token: String!, commentId: ID!): String
    }
`);

module.exports = schema;
