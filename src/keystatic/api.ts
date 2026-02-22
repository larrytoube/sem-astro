import type { APIRoute } from 'astro'
import { makeHandler } from '@keystatic/astro/api'
import config from '../../keystatic.config'

export const prerender = false

const keystatic = makeHandler({ config })

function withNormalizedRequest(context: Parameters<APIRoute>[0]) {
  const req = context.request
  const url = new URL(req.url, 'http://localhost')

  // On some serverless adapters, req.url resolves to localhost.
  // Rebuild with forwarded host/proto so OAuth callback URLs are correct.
  if (url.hostname === 'localhost') {
    const forwardedProto = req.headers.get('x-forwarded-proto')
    const forwardedHost = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
    if (forwardedHost) {
      const proto = forwardedProto ?? 'https'
      const absoluteUrl = new URL(url.pathname + url.search, `${proto}://${forwardedHost}`)
      const normalized = new Request(absoluteUrl.toString(), req)
      return Object.assign(Object.create(context), { request: normalized })
    }
  }

  return context
}

export const GET: APIRoute = (context) => {
  return keystatic(withNormalizedRequest(context))
}

export const POST: APIRoute = (context) => {
  return keystatic(withNormalizedRequest(context))
}

export const PUT: APIRoute = (context) => {
  return keystatic(withNormalizedRequest(context))
}

export const DELETE: APIRoute = (context) => {
  return keystatic(withNormalizedRequest(context))
}
