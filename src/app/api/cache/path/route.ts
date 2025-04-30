import { revalidatePath } from "next/cache";

export async function POST(request: Request){
    const body = await request.json();
    const {token, path} = body;

    if(!path || !token){
        return new Response('Missing path or token', {status: 400});
    }

    if(token !== process.env.CACHE_TOKEN){
        return new Response('Invalid token', {status: 401});
    }

    revalidatePath(path);
    return new Response('Cache revalidated', {status: 200});
}