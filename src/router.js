import { Router } from 'itty-router'

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

const apiDoc = () => {
    const returnData = [
        { "POST /api/images": "query=cat" },
        { "GET /api/encode/": "your_text_to_encode" },
    ]
    return new Response(JSON.stringify(returnData), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    })
}

router.get("/", () => {
    const welcome = `
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>minlaxz backend</title>
    </head>
    <body>
    <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
        <h3>Hello, World!</h3>
        <code>from minlaxz backend 👻</code>
        <code>go to /api</code>
    </div>
    </body>
    `
    return new Response(welcome, {
        headers: {
            'Content-Type': 'text/html',
        },
        status: 200
    })
})

router.get("/api", () => apiDoc())


/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
router.get("/api/encode/:text", ({ params }) => {
    // Decode text like "Hello%20world" into "Hello world"
    let input = decodeURIComponent(params.text)

    // Construct a buffer from our input
    let buffer = Buffer.from(input, "utf8")

    // Serialise the buffer into a base64 string
    let base64 = buffer.toString("base64")

    // Return the HTML with the string to the client
    return new Response(`<p>Base64 encoding: <code>${base64}</code></p>`, {
        headers: {
            "Content-Type": "text/html"
        },
        status: 200
    })
})

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

/*
This snippet ties our worker to the router we deifned above, all incoming requests
are passed to the router where your routes are called and the response is sent.
*/
addEventListener('fetch', (event) => {
    event.respondWith(router.handle(event.request))
})