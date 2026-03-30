import Link from 'next/link'
import Image from 'next/image'
import { getBooks, richTextToPlainText, slugFromFullSlug } from '@/lib/api'
import type { Book } from '@/lib/api'

const CATEGORY_SUBTITLES: Record<string, string> = {
  Newborns: 'The First Year',
  Toddlers: 'Discovery Age',
  'Pre-School': 'Narrative Journeys',
}

export default async function HomePage() {
  const books = await getBooks()

  const featured = [...books].sort((a, b) => (b.content.rating ?? 0) - (a.content.rating ?? 0)).slice(0, 3)
  const [hero, second, third] = featured
  const categories = Array.from(new Set(books.map((b) => b.content.category).filter(Boolean)))

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[870px] flex items-center px-12 md:px-20 overflow-hidden mb-24">
        <div className="relative z-10 max-w-2xl">
          <h1 className="font-headline text-7xl md:text-8xl text-on-surface leading-[1.1] tracking-tight mb-8">
            The Living Archive <br />of{' '}
            <span className="font-headline italic">Wonder</span>
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed">
            A curated collection of literary heirlooms designed to grow with your child, from first words to lasting memories.
          </p>
          <Link
            href="/collections"
            className="inline-block bg-primary text-on-primary px-8 py-4 font-label text-sm tracking-[0.1em] uppercase hover:opacity-90 transition-all active:scale-95"
          >
            Explore the Archive
          </Link>
        </div>
        {hero?.content.images?.[0]?.filename && (
          <div className="absolute top-0 right-0 w-full h-full md:w-3/5 z-0">
            <Image
              src={hero.content.images[0].filename}
              alt={hero.content.images[0].alt || hero.content.title}
              fill
              className="object-cover opacity-90"
              style={{ maskImage: 'linear-gradient(to left, black 60%, transparent 100%)' }}
              priority
            />
          </div>
        )}
      </section>

      {/* ── Curator's Prime Selection ──────────────────────────── */}
      <section className="px-12 md:px-20 mb-32 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="font-label text-xs tracking-[0.2em] text-primary uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="font-headline text-5xl text-on-surface">
              The Curator&apos;s Prime Selection
            </h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:block font-label text-sm border-b border-primary/20 pb-1 text-on-surface hover:text-primary transition-colors uppercase tracking-widest"
          >
            View All Editions
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {hero && (
            <div className="md:col-span-7 group">
              <Link href={`/books/${slugFromFullSlug(hero.full_slug)}`}>
                <div className="bg-surface-container-low aspect-[4/5] mb-8 overflow-hidden rounded-md relative">
                  {hero.content.images?.[0]?.filename ? (
                    <Image
                      src={hero.content.images[0].filename}
                      alt={hero.content.images[0].alt || hero.content.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl bg-surface-container">📚</div>
                  )}
                </div>
                <div className="max-w-md">
                  <h3 className="font-headline text-3xl mb-3">{hero.content.title}</h3>
                  {hero.content.whyWeLoveIt && (
                    <p className="font-body italic text-on-surface-variant text-sm border-l-2 border-secondary/30 pl-6 py-2">
                      &ldquo;{hero.content.whyWeLoveIt.slice(0, 160)}&rdquo;
                      {hero.content.curatorName && (
                        <span className="not-italic"> — {hero.content.curatorName}</span>
                      )}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          )}

          <div className="md:col-span-5 flex flex-col justify-center space-y-24">
            {[second, third].filter(Boolean).map((book, i) => (
              <BookMiniCard key={book!.uuid} book={book!} offset={i === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ───────────────────────────────────────── */}
      <section className="bg-surface-container-low py-32 px-12 md:px-20 text-center mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-tertiary mb-8 text-4xl font-headline">✦</div>
          <blockquote className="font-headline italic text-4xl md:text-6xl text-on-surface leading-tight">
            &ldquo;We don&apos;t sell books. We document early dreams.&rdquo;
          </blockquote>
          <cite className="not-italic font-label text-xs tracking-[0.2em] uppercase mt-12 block text-on-surface-variant">
            The Archive Philosophy
          </cite>
        </div>
      </section>

      {/* ── Explore by Chapter ────────────────────────────────── */}
      <section className="px-12 md:px-20 mb-48 max-w-[1440px] mx-auto">
        <h2 className="font-headline text-4xl mb-16">Explore by Chapter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.slice(0, 3).map((cat, i) => {
            const catBooks = books.filter((b) => b.content.category === cat)
            const img = catBooks[0]?.content.images?.[0]
            return (
              <Link
                key={cat}
                href={`/collections?category=${encodeURIComponent(cat)}`}
                className={`relative group cursor-pointer overflow-hidden block${i === 1 ? ' md:mt-12' : ''}`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface-container relative">
                  {img?.filename ? (
                    <Image
                      src={img.filename}
                      alt={img.alt || cat}
                      fill
                      className="object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-high" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="font-headline text-3xl text-white drop-shadow-sm">{cat}</h3>
                  <p className="font-label text-[10px] tracking-[0.2em] text-white/80 uppercase">
                    {CATEGORY_SUBTITLES[cat] ?? ''}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

function BookMiniCard({ book, offset }: { book: Book; offset: boolean }) {
  const img = book.content.images?.[0]
  const slug = slugFromFullSlug(book.full_slug)
  return (
    <Link href={`/books/${slug}`} className={`group block${offset ? ' -mt-8' : ''}`}>
      <div className="bg-surface-container-low aspect-square mb-6 overflow-hidden rounded-md relative">
        {img?.filename ? (
          <Image
            src={img.filename}
            alt={img.alt || book.content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-surface-container flex items-center justify-center text-5xl">📚</div>
        )}
      </div>
      <h3 className="font-headline text-2xl mb-2">{book.content.title}</h3>
      <p className="font-body text-xs text-primary tracking-widest uppercase mb-4">
        {book.content.category} · {book.content.ageRange}
      </p>
    </Link>
  )
}
