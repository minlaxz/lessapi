const corsHeaders = {
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
}

const getImages = async request => {
    const { query } = await request.json()
    const resp = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}`,
        {
            headers: {
                Authorization: `Client-ID ${unsplashKey}`,
            },
        },
    )
    const data = await resp.json()
    const images = data.results.map(image => ({
        id: image.id,
        src: image.urls.small,
        create_at: image.created_at,
        updated_at: image.updated_at,
        alt: image.alt_description,
    }))
    return new Response(JSON.stringify(images), {
        headers: {
            'Content-type': 'application/json',
            ...corsHeaders,
        },
        status: 201,
    })
}

export const CORSOptions = (request) => {
    /* preflight */
    if (request.method === 'OPTIONS') {
        return new Response('OK', { headers: corsHeaders, status: 200 });
    }
}

export const PostImage = (request) => {
    return getImages(request)
}