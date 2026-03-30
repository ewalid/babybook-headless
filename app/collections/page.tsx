import Link from 'next/link'
import Image from 'next/image'
import { getBooks, richTextToPlainText, slugFromFullSlug } from '@/lib/api'
import type { Book } from '@/lib/api'
import CollectionsClient from './CollectionsClient'

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const books = await getBooks()
  const { category } = await searchParams
  const categories = Array.from(new Set(books.map((b) => b.content.category).filter(Boolean))) as string[]

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="pt-32 pb-24 px-12 md:px-24 max-w-[1440px] mx-auto text-center">
        <h1 className="font-headline italic text-7xl md:text-8xl tracking-tighter mb-8">
          The Complete Curation.
        </h1>
        <p className="font-body text-on-surface-variant max-w-2xl mx-auto text-[11px] uppercase tracking-[0.15em] leading-relaxed">
          A curated physical repository of stories, hand-selected to bridge the gap between classic literature and the contemporary nursery.
        </p>
      </header>

      {/* ── Filter + Grid (client) ──────────────────────────────── */}
      <CollectionsClient books={books} categories={categories} initialCategory={category} />

      {/* ── Editorial Break ─────────────────────────────────────── */}
      <section className="bg-surface-container-low py-32 mb-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-12 md:px-24 flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative">
            {books[0]?.content.images?.[0]?.filename ? (
              <Image
                src={books[0].content.images[0].filename}
                alt="Editorial"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover rounded-sm grayscale-[30%]"
              />
            ) : (
              <div className="w-full h-[500px] bg-surface-container rounded-sm" />
            )}
            <div className="absolute -bottom-8 -right-8 bg-primary p-12 hidden lg:block">
              <span className="text-surface text-4xl">✦</span>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <blockquote className="font-headline italic text-4xl md:text-5xl leading-tight text-primary mb-10">
              &ldquo;The foundation of a life-long love for literature begins with the tactile weight of a cover and the scent of fine ink.&rdquo;
            </blockquote>
            <cite className="font-label uppercase tracking-[0.25em] text-xs not-italic text-on-surface-variant">
              — Editorial Director
            </cite>
          </div>
        </div>
      </section>
    </>
  )
}
