import { Router } from 'itty-router';
import Docs from './handlers/docs';
import Encode from './handlers/encode';
import Home from './handlers/home';

const router = Router()

/* .me domain is not stable */
const corsHeaders = {
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Origin': 'https://github.minlaxz.me',
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
    }))
    return new Response(JSON.stringify(images), {
        headers: {
            'Content-type': 'application/json',
            ...corsHeaders
        },
        status: 201
    })
}


router
    .get("/", Home)
    .get("/minlaxz", () => new Response(`Hello, minlaxz`, { 'Content-Type': 'text/html', status: 200 }))
    .get("/api", Docs)
    .get("/api/encode/:text", Encode)

router.options("/api/images", () => {
    /* Preflight */
    return new Response("OK", {
        headers: corsHeaders
    })
})

router.post("/api/images", async request => {
    return getImages(request)
})

router.all("*", () => new Response("404, not found!", { status: 404 }))

export const handleRequest = request => router.handle(request)