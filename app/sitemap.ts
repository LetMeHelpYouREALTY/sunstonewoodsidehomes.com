import { MetadataRoute } from 'next'

import { models } from '@/lib/models'
import { moveInReadyHomes } from '@/lib/move-in-ready'
import { serviceAreas } from '@/lib/service-areas'

const baseUrl = 'https://www.sunstonewoodsidehomes.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/',
    '/models',
    '/move-in-ready',
    '/buyers-guide',
    '/communities',
    '/amenities',
    '/service-areas',
    '/financing',
    '/contact',
  ]

  const dynamicRoutes = [
    ...models.map((model) => `/models/${model.slug}`),
    ...moveInReadyHomes.map((home) => `/move-in-ready/${home.slug}`),
    ...serviceAreas.map((area) => `/service-areas/${area.slug}`),
  ]

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))
}
