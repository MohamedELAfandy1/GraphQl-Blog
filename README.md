# GraphQL API Project

This project is a GraphQL-powered API built with Node.js, Express, and MongoDB. It enables users to manage posts, comments, and authentication via GraphQL queries and mutations.

## Features
- GraphQL for efficient data fetching and manipulation
- User authentication with JWT
- CRUD operations for users, posts, and comments
- MongoDB as the database
- Role-Based Access Admin users have additional privileges.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/MohamedELAfandy1/GraphQl-Blog.git
   cd GraphQl-Blog
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the server:
   ```sh
   npm run start
   ```

## GraphQL Endpoints

Access the GraphQL API via:
```
http://localhost:3002/graphql
```

Use GraphiQL for interactive queries and testing.

## Example Queries & Mutations

### Fetch All Posts
```graphql
{
  getAllPosts {
    title
    content
    user {
      name
    }
  }
}
```

### Create a New Post
```graphql
mutation {
  createPost(title: "GraphQL Intro", content: "GraphQL is amazing!", token: "your_token")
}
```

### User Signup
```graphql
mutation {
  signUp(registrationInput: {name: "Mohamed", email: "mohamed@g.com", password: "123"}) {
    name
    email
  }
}
```

## Project Structure
```
/graphql
  ├── resolvers
  │   ├── userResolver.js
  │   ├── postResolver.js
  │   ├── commentResolver.js
  ├── schema.js
/models
  ├── user.js
  ├── post.js
  ├── comment.js
/utils
  ├── auth.js
server.js
dbConnection.js
```

## Contributing
Feel free to submit issues or pull requests to improve the project!

## License
This project is open-source and available under the MIT License.
