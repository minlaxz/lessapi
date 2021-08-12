addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // await is important
  const { query } = await request.json()
  console.log(query)
  const resp = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
    headers: {
      'Authorization': `Client-ID ${unsplashKey}`
    }
  })
  const data = await resp.json()
  const images = data.results.map(image => ({
    id: image.id,
    url: image.urls.small,
    create_at: image.created_at,
    updated_at: image.updated_at,
    alt: image.alt_description,
    // html: image.links.html, => https://unsplash.com/photos/$id
  }))
  return new Response(JSON.stringify(images), {
    headers: {
      'Content-type': 'application/json'
    },
  })
}
