addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const resp = await fetch("https://api.unsplash.com/photos/", {
    headers: {
      'Authorization': `Client-ID ${unsplashKey}`
    }
  })
  const data = await resp.json()
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json'
    },
  })


  const body = await request.json()
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-type': 'application/json'
    },
  })
}
