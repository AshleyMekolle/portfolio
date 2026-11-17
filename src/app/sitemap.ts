import type { MetadataRoute } from 'next'
import { caseStudies } from '@/data/projects'
import { site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/archive`, changeFrequency: 'monthly', priority: 0.6 },
    ...caseStudies.map((c) => ({ url: `${site.url}/work/${c.slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
  ]
}
