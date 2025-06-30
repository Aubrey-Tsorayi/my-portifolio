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
  } catch (error: unknown) {
    // Improved error logging for debugging
    let details = 'Unknown error';
    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'errors' in error.response
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      details = error.response.errors || (error as any).message;
    } else if (error instanceof Error) {
      details = error.message;
    }
    console.error('Error fetching writings:', details);
    return NextResponse.json(
      { error: 'Failed to fetch writings.', details },
      { status: 500 }
    );
  }
}
