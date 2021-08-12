// import handleRequests from './src/handler';

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
    // event.respondWith(handleRequests(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 * Dealing with CORS
 */

const corsHeaders = {
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Origin': '*',
}

const getImages = async request => {
    const { query } = await request.json()
    const resp = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: {
            'Authorization': `Client-ID ${unsplashKey}`
        }
    })
    const data = await resp.json()
    const images = data.results.map(image => ({
        id: image.id,
        src: image.urls.small,
        create_at: image.created_at,
        updated_at: image.updated_at,
        alt: image.alt_description,
        // html: image.links.html, => https://unsplash.com/photos/$id
    }))
    return new Response(JSON.stringify(images), {
        headers: {
            'Content-type': 'application/json',
            ...corsHeaders
        },
    })
}

async function handleRequest(request) {
    if (request.method === "OPTIONS") {
        return new Response("OK", {
            headers: corsHeaders
        })
    }

    if (request.method === "POST") {
        return getImages(request)
    }



}
