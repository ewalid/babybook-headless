import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getBook, getBooks, richTextToPlainText } from '@/lib/api'

export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((b) => ({ slug: b.slug }))
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1 text-tertiary">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>★</span>
      ))}
    </div>
  )
}

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await getBook(slug)
  if (!book) notFound()

  const { content } = book
  const img = content.images?.[0]
  const description = richTextToPlainText(content.description as never)
  const hasSpecs = content.publisher || content.pages || content.format || content.language

  return (
    <article className="max-w-[1440px] mx-auto">

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="px-12 md:px-24 pt-12 pb-0">
        <Link href="/collections" className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
          ← Collections
        </Link>
      </div>

      {/* ── Product Hero ────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 px-12 md:px-24 py-24 items-center">
        <div className="md:col-span-7">
          <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-sm shadow-xl relative">
            {img?.filename ? (
              <Image
                src={img.filename}
                alt={img.alt || content.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-surface-container flex items-center justify-center text-9xl">📚</div>
            )}
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-center space-y-12">
          <div className="space-y-4">
            <span className="font-label uppercase tracking-[0.2em] text-[10px] text-primary">
              {content.category} · {content.ageRange}
            </span>
            <h1 className="font-headline italic text-5xl md:text-7xl tracking-tight leading-none text-on-surface">
              {content.title}
            </h1>
            {description && (
              <p className="font-headline text-xl text-on-surface/60 italic leading-snug">
                {description.slice(0, 80)}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <div className="flex items-baseline space-x-4">
              <span className="text-3xl font-headline italic">{content.price}</span>
              {content.originalPrice && (
                <span className="text-sm font-label text-outline uppercase tracking-widest line-through">
                  {content.originalPrice}
                </span>
              )}
              {content.badge && (
                <span className="text-xs font-label uppercase tracking-widest text-tertiary">
                  {content.badge}
                </span>
              )}
            </div>

            {content.rating && (
              <div className="flex items-center gap-3">
                <StarRating rating={content.rating} />
                {content.reviewCount && (
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {content.reviewCount}
                  </span>
                )}
              </div>
            )}

            <Link
              href="/collections"
              className="inline-block w-full md:w-auto text-center px-12 py-4 bg-primary text-on-primary font-label text-sm uppercase tracking-[0.15em] hover:bg-primary-container transition-all duration-300"
            >
              Add to Archive
            </Link>

            {description && (
              <div className="pt-8 border-t border-outline-variant/20">
                <p className="text-sm text-on-surface-variant font-body leading-relaxed max-w-sm">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Why We Love It ──────────────────────────────────── */}
      {content.whyWeLoveIt && (
        <section className="bg-surface-container-low py-32 px-12 md:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-6xl mx-auto">
            <div>
              <h2 className="font-headline text-4xl italic mb-12">Why We Love It</h2>
              <p className="drop-cap text-lg leading-relaxed text-on-surface-variant">
                {content.whyWeLoveIt}
              </p>
            </div>
            <div className="flex flex-col space-y-12">
              {content.highlights?.length > 0 && (
                <div className="bg-surface-container-lowest p-10 shadow-[0_20px_40px_rgba(27,28,25,0.03)] border-l-4 border-primary space-y-4">
                  <h4 className="font-label text-xs uppercase tracking-widest text-primary">
                    Highlights
                  </h4>
                  {content.highlights.map((h) => (
                    <p key={h._uid} className="text-sm font-body text-on-surface-variant leading-loose italic">
                      {h.icon && <span className="not-italic mr-2">{h.icon}</span>}
                      {h.text}
                    </p>
                  ))}
                </div>
              )}
              {content.images?.[1]?.filename && (
                <div className="aspect-[16/10] bg-surface-container overflow-hidden rounded-sm relative ml-12 -mt-6">
                  <Image
                    src={content.images[1].filename}
                    alt={content.images[1].alt || 'Interior detail'}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Specifications ──────────────────────────────────── */}
      {hasSpecs && (
        <section className="py-24 px-12 md:px-24 max-w-4xl mx-auto">
          <h3 className="font-headline text-2xl italic mb-12">Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 font-body text-sm border-t border-outline-variant/30 pt-12">
            {[
              ['Publisher', content.publisher],
              ['Format', content.format],
              ['Pages', content.pages],
              ['Language', content.language],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-outline-variant/10">
                  <span className="text-on-surface-variant font-medium">{label}</span>
                  <span className="text-on-surface">{value}</span>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* ── Curator's Perspective ───────────────────────────── */}
      {content.curatorName && content.whyWeLoveIt && (
        <section className="py-32 px-12 md:px-24 bg-surface-container-high/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="w-full md:w-1/3">
              <div className="aspect-square bg-surface-container rounded-sm overflow-hidden grayscale relative">
                {content.curatorImage?.filename ? (
                  <Image
                    src={content.curatorImage.filename}
                    alt={content.curatorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-8">
              <span className="font-label text-xs uppercase tracking-widest text-secondary">
                The Curator&apos;s Note
              </span>
              <blockquote className="font-headline text-3xl md:text-4xl italic leading-snug text-on-surface">
                &ldquo;{content.whyWeLoveIt}&rdquo;
              </blockquote>
              <div>
                <p className="font-label text-sm font-bold tracking-widest text-on-surface">
                  {content.curatorName}
                </p>
                {content.curatorRole && (
                  <p className="font-headline italic text-on-surface-variant text-lg">
                    {content.curatorRole}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Voices from the Archive ─────────────────────────── */}
      {content.reviews?.length > 0 && (
        <section className="py-32 px-12 md:px-24">
          <div className="text-center mb-24">
            <h3 className="font-headline text-4xl italic">Voices from the Archive</h3>
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-outline mt-4">
              Verified Guardians
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {content.reviews.map((review) => (
              <div key={review._uid} className="space-y-6">
                <StarRating rating={review.rating} />
                <p className="font-body text-base text-on-surface-variant leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-outline-variant/20">
                  <p className="font-label text-[10px] uppercase tracking-widest font-bold">
                    {review.authorName}
                  </p>
                  {review.authorRole && (
                    <p className="text-[10px] text-outline">{review.authorRole}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
