import { NextResponse } from 'next/server';
import { request, gql } from 'graphql-request';

const HASHNODE_API = 'https://gql.hashnode.com';

const GET_POSTS = gql`
  query {
    publication(host: "thestudentdev.hashnode.dev") {
      posts(first: 10) {
        edges {
          node {
            title
            slug
            brief
            coverImage {
              url
            }
            cuid
          }
        }
      }
    }
  }
`;

interface HashnodeResponse {
  publication?: {
    posts?: {
      edges?: {
        node: {
          title: string;
          slug: string;
          brief: string;
          coverImage: { url: string };
          cuid: string;
        };
      }[];
    };
  };
}

export async function GET() {
  try {
    const data = await request<HashnodeResponse>(HASHNODE_API, GET_POSTS);
    const posts = data.publication?.posts?.edges?.map((edge) => edge.node) || [];
    return NextResponse.json(posts);
  } catch (error: any) {
    // Improved error logging for debugging
    console.error('Error fetching writings:', error?.response?.errors || error);
    return NextResponse.json(
      { error: 'Failed to fetch writings.', details: error?.response?.errors || error.message },
      { status: 500 }
    );
  }
}
