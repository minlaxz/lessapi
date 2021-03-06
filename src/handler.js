import { Router } from 'itty-router'
import Docs from './handlers/docs'
import Encode from './handlers/encode'
import { LastCommit } from './handlers/github'
import Home from './handlers/home'
import { CORSOptions, PostImage } from './handlers/images'
import { GetShortenedLink, ShortLinks } from './handlers/links'

const router = Router()

router
    .get('/', Home)
    .get('/api', Docs)
    .get('/api/encode/:text', Encode)
    .get('/api/github/:action', LastCommit)
    .options('/api/images', CORSOptions)
    .post('/api/images', PostImage)
    .post('/api/links', ShortLinks)
    .get('/api/links/:slug', GetShortenedLink)
    .all('*', () => new Response('404, not found!', { status: 404 }))

export const handleRequest = (request) => router.handle(request)
