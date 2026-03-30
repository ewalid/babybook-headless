const TOKEN = 'InQ9oIT6hTqE2m9THFGQhQtt'
const BASE = 'https://api.storyblok.com/v2/cdn'

export type BookReview = {
  _uid: string
  rating: number
  quote: string
  authorName: string
  authorRole?: string
  authorImage?: { filename: string; alt: string }
}

export type BookHighlight = {
  _uid: string
  icon?: string
  text: string
}

export type Book = {
  uuid: string
  slug: string
  full_slug: string
  content: {
    title: string
    titleEmphasis?: string
    badge?: string
    ageRange: string
    price: string
    originalPrice?: string
    category: string
    images: { filename: string; alt: string }[]
    description: { type: string; content: unknown[] }
    publisher?: string
    pages?: string
    format?: string
    language?: string
    rating?: number
    reviewCount?: string
    highlights: BookHighlight[]
    whyWeLoveIt?: string
    curatorName?: string
    curatorRole?: string
    curatorImage?: { filename: string; alt: string }
    reviews: BookReview[]
    shippingNote?: string
    returnNote?: string
  }
}

function normaliseBook(story: Book): Book {
  const images = story.content?.images
  if (images && !Array.isArray(images)) {
    story.content.images = (images as unknown as { filename?: string }).filename
      ? [images as unknown as { filename: string; alt: string }]
      : []
  }
  return story
}

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(
    `${BASE}/stories?token=${TOKEN}&version=published&starts_with=pages/books/&per_page=25&sort_by=created_at:asc`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return []
  const data = await res.json()
  return (data.stories ?? []).filter((s: Book) => s.slug !== 'books').map(normaliseBook)
}

export async function getBook(slug: string): Promise<Book | null> {
  const res = await fetch(
    `${BASE}/stories/pages/books/${slug}?token=${TOKEN}&version=published`,
    { next: { revalidate: 60 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.story ? normaliseBook(data.story) : null
}

export function richTextToPlainText(doc: { type: string; content?: unknown[] } | undefined): string {
  if (!doc?.content) return ''
  const extract = (nodes: unknown[]): string =>
    nodes
      .map((n: unknown) => {
        const node = n as { type: string; text?: string; content?: unknown[] }
        if (node.type === 'text') return node.text ?? ''
        if (node.content) return extract(node.content)
        return ''
      })
      .join('')
  return extract(doc.content)
}

export function slugFromFullSlug(fullSlug: string): string {
  const parts = fullSlug.split('/')
  return parts[parts.length - 1] ?? fullSlug
}
