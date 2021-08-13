import { Router } from 'itty-router'
import Docs from './handlers/docs'
import Encode from './handlers/encode'
import Home from './handlers/home'
import { CORSOptions, PostImage } from './handlers/images'

const router = Router()

router
  .get('/', Home)
  .get('/minlaxz', () => new Response(`Hello, minlaxz`, {
    'Content-Type': 'text/plain', status: 200,
  }),
  )
  .get('/api', Docs)
  .get('/api/encode/:text', Encode)

router.options('/api/images', CORSOptions)
router.post('/api/images', PostImage)
router.all('*', () => new Response('404, not found!', { status: 404 }))

export const handleRequest = (request) => router.handle(request)
