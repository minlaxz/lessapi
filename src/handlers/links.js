import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    6,
);

const corsHeaders = {
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Origin': '*',
}

export const ShortLinks = async (request) => {
    let slug = nanoid();
    let requestBody = await request.json();
    if ('url' in requestBody) {
        await SHORTEN.put(slug, requestBody.url, { expirationTtl: 86400 });
        let shortenedURL = `${new URL(request.url).origin}/${slug}`;
        let responseBody = {
            message: "Link shortened successfully",
            slug,
            shortenedURL
        };
        return new Response(JSON.stringify(responseBody), {
            headers: {
                'Content-Type': 'application/json',
                ...corsHeaders,
            },
            status: 200,
        });
    } else {
        return new Response("required 'url' in POST data.", {
            headers: {
                'Content-Type': 'text/plain',
                ...corsHeaders,
            },
            status: 400,
        })
    }
}

export const GetShortenedLink = async request => {
    let link = await SHORTEN.get(request.params.slug)
    if (link) {
        return new Response(null, {
            headers: {
                Location: link,
                ...corsHeaders,
            },
            status: 302,
        });
    } else {
        return new Response("Link not found.", {
            headers: {
                'Content-Type': 'text/plain',
                ...corsHeaders,
            },
            status: 404,
        });
    }
}