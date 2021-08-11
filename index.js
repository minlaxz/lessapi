addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const body = await request.json()
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json' },
  })
}
