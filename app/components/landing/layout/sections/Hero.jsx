import heroBg from '@/public/images/herobg.jpg'
import resortImage from '@/public/images/resort_sectionbg.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" id="heroSection" aria-label="Beach Resort Hero">
      <div className="heroBg" aria-hidden="true">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 bg-center bg-cover scale-[1.05] saturate-[1.05] contrast-[1.05]"
        />
      </div>
      <div class="absolute inset-0 bg-black/70"></div>

      <main className="relative z-10 min-h-screen flex items-center justify-center px-5 pt-[120px] pb-16">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_minmax(280px,420px)] gap-6 md:gap-10 items-center">
          <div className="max-w-[720px] text-left md:text-left text-center md:text-left">
            <div className="inline-block text-[13px] tracking-[0.22em] uppercase text-white/80 mb-4 font-secondary">Sea, Sand, Serenity</div>
            <h1 className="m-0 font-display text-[clamp(44px,5.1vw,72px)] leading-[1.03] text-white/95 tracking-[-0.5px] drop-shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
              <span className="text-[rgb(var(--brand-cyan))] italic">Muni-Muni</span> Beach Resort Samal Island
            </h1>
            <p className="mt-4 mb-7 text-[18px] leading-[1.6] text-white/80">
              Discover your perfect escape, where golden sands, crystal waters, and peaceful moments come together.
            </p>

            <div className="flex flex-wrap gap-3 justify-start md:justify-start justify-center">
              <Link className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] font-normal tracking-[0.2px] text-white/95 bg-[rgb(var(--brand-cyan))] shadow-[0_14px_40px_rgba(var(--brand-cyan-rgb),0.18)] transition hover:-translate-y-[1px] hover:shadow-[0_18px_52px_rgba(var(--brand-cyan-rgb),0.26)] font-secondary" href="/packages">
                Book Here
              </Link>
              <Link
                className="inline-flex items-center justify-center px-4 py-3 rounded-[10px] font-medium text-white/90 border border-white/20 bg-black/20 font-secondary"
                href="#resort-gallery"
              >
                View Gallery
              </Link>
            </div>
          </div>

          <aside className="hidden md:block rounded-2xl overflow-hidden bg-[rgba(8,12,18,0.55)] border border-white/20 shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md" aria-label="Muni-Muni Beach Resort image">
            <Image
              className="block w-full h-[360px] object-cover"
              src={resortImage}
              alt="Beachfront view of Muni-Muni Beach Resort"
              sizes="(max-width: 1024px) 100vw, 480px"
              priority
            />
          </aside>
        </div>
      </main>

    </section>
  )
}

