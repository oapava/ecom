import { revalidateTag } from "next/cache";

export async function POST(request: Request){
    const body = await request.json();
    const {token, tag} = body;

    if(!tag || !token){
        return new Response('Missing tag or token', {status: 400});
    }

    if(token !== process.env.CACHE_TOKEN){
        return new Response('Invalid token', {status: 401});
    }

    revalidateTag(tag);
    return new Response('Cache revalidated', {status: 200});
}