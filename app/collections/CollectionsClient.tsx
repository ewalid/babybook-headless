'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { richTextToPlainText, slugFromFullSlug } from '@/lib/api'
import type { Book } from '@/lib/api'

type Props = {
  books: Book[]
  categories: string[]
  initialCategory?: string
}

export default function CollectionsClient({ books, categories, initialCategory }: Props) {
  const [selected, setSelected] = useState(initialCategory ?? 'All')

  useEffect(() => {
    if (initialCategory) setSelected(initialCategory)
  }, [initialCategory])

  const tabs = ['All', ...categories]
  const filtered = selected === 'All' ? books : books.filter((b) => b.content.category === selected)

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-24 z-40 bg-surface py-8 px-12 md:px-24 mb-16">
        <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center gap-12 font-label uppercase tracking-widest text-[10px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelected(tab)}
              className={`transition-colors pb-1 ${
                selected === tab
                  ? 'text-primary font-bold border-b border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Book grid */}
      <section className="px-12 md:px-24 mb-32 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {filtered.map((book) => {
            const img = book.content.images?.[0]
            const slug = slugFromFullSlug(book.full_slug)
            const description = richTextToPlainText(book.content.description as never)
            return (
              <article key={book.uuid} className="group">
                <div className="bg-surface-container-lowest aspect-[3/4] mb-6 overflow-hidden relative">
                  {img?.filename ? (
                    <Image
                      src={img.filename}
                      alt={img.alt || book.content.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container flex items-center justify-center text-6xl">📚</div>
                  )}
                  <span className="absolute top-4 left-4 font-label text-[9px] tracking-[0.2em] bg-surface/90 px-3 py-1 uppercase">
                    {book.content.ageRange}
                  </span>
                  {book.content.badge && (
                    <span className="absolute top-4 right-4 font-label text-[9px] tracking-[0.2em] bg-primary/90 text-on-primary px-3 py-1 uppercase">
                      {book.content.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-headline text-xl mb-2">{book.content.title}</h3>
                <p className="font-label text-xs tracking-widest text-on-surface-variant mb-4">
                  {book.content.price}
                  {book.content.originalPrice && (
                    <span className="line-through ml-3 opacity-50">{book.content.originalPrice}</span>
                  )}
                </p>
                <Link
                  href={`/books/${slug}`}
                  className="font-label text-[10px] uppercase tracking-[0.2em] border-b border-outline-variant hover:border-primary transition-all pb-1"
                >
                  Archive Access
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
