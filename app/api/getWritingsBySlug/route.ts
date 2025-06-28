import { NextRequest, NextResponse } from 'next/server';
import { gql, request } from 'graphql-request';

const HASHNODE_API = 'https://gql.hashnode.com';

// ✅ Updated GraphQL query with correct parameters
const GET_POST_BY_SLUG = gql`
  query Publication ($host: String!, $slug: String!) {
    publication(host: $host) {
        title
        post(slug: $slug) {
            title
            content {
                html
            }
        }
    }
}
`;

// ✅ Improved TypeScript interfaces
interface HashnodePostContent {
  html: string;
}

interface HashnodePost {
  title: string;
  content: HashnodePostContent;
}

interface HashnodePublication {
  post: HashnodePost | null;
}

interface HashnodePostResponse {
  publication: HashnodePublication | null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const host = 'thestudentdev.hashnode.dev';

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
  }

  try {
    console.log(`Fetching post with slug: ${slug} from host: ${host}`);

    const variables = { slug, host };
    const data = await request<HashnodePostResponse>(HASHNODE_API, GET_POST_BY_SLUG, variables);

    // ✅ Improved null checking
    if (!data?.publication?.post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(data.publication.post);
  } catch (error: any) {
    // ✅ Enhanced error details
    const errorDetails = error.response?.errors?.[0]?.message || error.message;
    console.error(`Error fetching post: ${slug}`, errorDetails);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch post', 
        details: errorDetails,
        slug,
        host
      },
      { status: 500 }
    );
  }
}
