import type { APIRoute } from 'astro'
import { makeHandler } from '@keystatic/astro/api'
import config from '../../keystatic.config'

export const prerender = false

const keystatic = makeHandler({ config })

export const GET: APIRoute = (context) => {
  return keystatic(context)
}

export const POST: APIRoute = (context) => {
  return keystatic(context)
}

export const PUT: APIRoute = (context) => {
  return keystatic(context)
}

export const DELETE: APIRoute = (context) => {
  return keystatic(context)
}
