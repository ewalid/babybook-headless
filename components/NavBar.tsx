import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-[#fbf9f4]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(27,28,25,0.05)]">
      <div className="flex justify-between items-center px-12 py-6 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="font-headline text-2xl font-semibold text-on-surface tracking-tighter"
        >
          The Editorial Archive
        </Link>
        <div className="hidden md:flex items-center space-x-12">
          <Link
            href="/collections"
            className="text-on-surface/60 font-medium hover:text-primary transition-colors text-sm tracking-wide"
          >
            Collections
          </Link>
          <Link
            href="/"
            className="text-on-surface/60 font-medium hover:text-primary transition-colors text-sm tracking-wide"
          >
            About
          </Link>
          <Link
            href="/"
            className="text-on-surface/60 font-medium hover:text-primary transition-colors text-sm tracking-wide"
          >
            Journal
          </Link>
        </div>
        <Link href="/collections" className="hover:opacity-70 transition-opacity duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </Link>
      </div>
    </nav>
  )
}
