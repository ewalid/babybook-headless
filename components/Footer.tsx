export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full pt-24 pb-12 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 px-20 max-w-[1440px] mx-auto">
        <div className="col-span-1">
          <div className="font-headline text-3xl italic text-on-surface mb-6">
            The Editorial Archive
          </div>
          <p className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface/50 leading-loose">
            Curating the first library of the modern child.
          </p>
        </div>
        <div>
          <h4 className="font-label uppercase tracking-[0.1em] text-[10px] mb-8 text-primary font-bold">
            The Shop
          </h4>
          <ul className="space-y-4">
            {['Our Philosophy', 'Journal', 'Concierge'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface/50 hover:text-secondary transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-label uppercase tracking-[0.1em] text-[10px] mb-8 text-primary font-bold">
            Customer Care
          </h4>
          <ul className="space-y-4">
            {['Shipping', 'Returns', 'Privacy'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface/50 hover:text-secondary transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-label uppercase tracking-[0.1em] text-[10px] mb-8 text-primary font-bold">
            Join the Archive
          </h4>
          <div className="relative border-b border-on-surface/20 pb-2">
            <input
              type="email"
              placeholder="YOUR EMAIL"
              className="bg-transparent border-none outline-none w-full font-label uppercase tracking-[0.1em] text-[10px] placeholder:text-on-surface/30"
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-on-surface/50 hover:text-primary transition-colors">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="px-20 mt-24 flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto border-t border-on-surface/5 pt-8">
        <p className="font-label uppercase tracking-[0.1em] text-[10px] text-on-surface/50">
          © 2024 The Editorial Archive. All Rights Reserved.
        </p>
        <div className="flex space-x-8 mt-4 md:mt-0 font-label uppercase tracking-[0.1em] text-[10px] text-on-surface/50">
          <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  )
}
