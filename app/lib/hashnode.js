// lib/hashnode.js
import { request, gql } from 'graphql-request';

const HASHNODE_API = 'https://gql.hashnode.com';

const GET_POSTS = gql`
  query GetUserArticles {
    user(username: "tsorai") {
      publication {
        posts(page: 0) {
          title
          brief
          slug
          coverImage
          dateAdded
        }
      }
    }
  }
`;

export async function fetchPosts() {
  const data = await request(HASHNODE_API, GET_POSTS);
  return data.user.publication.posts;
}
