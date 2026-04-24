"use client"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link' // Next.js routing link

const navItems = [
  { label: 'Home', targetId: 'heroSection' },
  { label: 'Packages', targetId: 'packagesSection' },
  { label: 'Amenities', targetId: 'amenitiesSection' },
  { label: 'Location', targetId: 'locationSection' },
  { label: 'Contact', targetId: 'contactSection' },
]

export default function TopNav() {
  //dropdown states
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  //customer account state
  // const [currentCustomer, setCurrentCustomer] = useState(() => readCurrentCustomer())

  //references for DOMS
  const profileMenuRef = useRef<HTMLDivElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  //derive customer initials for profile button
  // const customerInitials = useMemo(() => {
  //   const name = currentCustomer?.fullName?.trim() ?? ''
  //   if (!name) return 'P'

  //   const segments = name.split(/\s+/).filter(Boolean) //regex to split by whitespace and filter out empty segments
  //   if (segments.length === 1) return segments[0].slice(0, 1).toUpperCase()
  //   return `${segments[0].slice(0, 1)}${segments[segments.length - 1].slice(0, 1)}`.toUpperCase()
  // }, [currentCustomer])

  // sync current customer on auth change and handle outside clicks for dropdowns and escape key to close
  useEffect(() => {
    // Sync current customer when auth changes in other tabs or on sign in/sign out
    // const syncCurrentCustomer = () => setCurrentCustomer(readCurrentCustomer())
    
    // Close dropdowns when clicking outside or pressing escape
    const onDocMouseDown = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }

      if (!menuButtonRef.current?.contains(event.target as Node) && !mobileMenuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileMenuOpen(false)
        setMenuOpen(false)
      }
    }

    // window.addEventListener('storage', syncCurrentCustomer) // Listen to storage events across tabs
    // window.addEventListener(AUTH_CHANGED_EVENT, syncCurrentCustomer) // Custom event within the same tab
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      // window.removeEventListener('storage', syncCurrentCustomer)
      // window.removeEventListener(AUTH_CHANGED_EVENT, syncCurrentCustomer)
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  // Handle navigation to sections and close mobile menu
  const onNavigateTo = (event: React.MouseEvent<HTMLElement>, targetId: string) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (target) {
      const navOffset = 70
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    setMenuOpen(false)
  }

  // Close mobile menu when clicking "Book Here" in mobile menu
  const onMobileBookNowClick = () => {
    setMenuOpen(false)
  }

  // Handle sign out action
  const handleSignOut = () => {
    // clearCurrentCustomer()
    setProfileMenuOpen(false)
  }

  const linkClass =
    "no-underline text-white font-normal text-[15px] tracking-[0.2px] relative px-[6px] py-[8px] cursor-pointer font-[family-name:var(--secondary-font)] after:content-[''] after:absolute after:left-[6px] after:right-[6px] after:bottom-[2px] after:h-px after:bg-[rgb(var(--brand-cyan))] after:scale-x-0 after:origin-center after:transition-transform after:duration-150 after:ease-in-out hover:after:scale-x-100"
  const dropdownItem =
    "no-underline border-0 rounded-lg bg-transparent text-white/90 px-2.5 py-2.5 text-[13px] text-left cursor-pointer hover:bg-white/10"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 py-[18px]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4 bg-[rgba(10,14,20,0.6)] border border-[rgba(255,255,255,0.14)] rounded-[20px] shadow-[0_18px_60px_rgba(0,0,0,0.25)] backdrop-blur-[14px] p-[14px_18px]">

        {/* to be replaced with logo*/} 
        <Link
          className="font-[family-name:var(--primary-font)] font-bold tracking-[0.3px] no-underline text-[rgba(255,255,255,0.92)] text-[20px] whitespace-nowrap"
          href="#heroSection"
          aria-label="BeachResort home"
          onClick={(event) => onNavigateTo(event, 'heroSection')}
        >
          MuniMuni
        </Link>

        <nav className="flex items-center justify-center gap-7 flex-1 max-[860px]:hidden" aria-label="Primary navigation">
          {/* Render navigation links for smooth scrolling to in-page sections */}
          {navItems.map((item) => (
            <a
              key={item.targetId}
              className={linkClass}
              href={`#${item.targetId}`}
              onClick={(event) => onNavigateTo(event, item.targetId)}
            >
              {item.label}
            </a>
          ))}
          <Link href="/faq" className={linkClass} target="_blank" rel="noopener noreferrer">
            FAQ
          </Link>
        </nav>

        {/* Profile menu, Book Now button, and mobile menu button */}
        <div className="flex items-center gap-3">
          <Link
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-[10px] font-normal tracking-[0.2px] text-white/95 bg-[rgb(var(--brand-cyan))] shadow-[0_14px_40px_rgba(var(--brand-cyan),0.18)] transition duration-150 ease-in-out hover:-translate-y-[1px] hover:shadow-[0_18px_52px_rgba(var(--brand-cyan),0.26)] font-[family-name:var(--secondary-font)]"
            href="/packages"
          >
            Book Here
          </Link>

          {/* Mobile menu button, visible on smaller screens */}
          <button
            type="button"
            className="hidden max-[860px]:inline-flex items-center justify-center border border-white/20 bg-black/20 text-white/90 rounded-[10px] px-3 py-2 cursor-pointer font-[family-name:var(--secondary-font)]"
            ref={menuButtonRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((prev) => !prev)
              setProfileMenuOpen(false)
            }}
          >
            <span className="inline-flex flex-col gap-1" aria-hidden="true">
              <span className="w-[18px] h-[2px] bg-white/90 rounded-sm" />
              <span className="w-[18px] h-[2px] bg-white/90 rounded-sm" />
              <span className="w-[18px] h-[2px] bg-white/90 rounded-sm" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu, conditionally rendered based on menuOpen state */}
      {menuOpen && (
        <div className="absolute top-[calc(100%-6px)] left-5 right-5 mx-auto z-[60] max-w-[1200px]" ref={mobileMenuRef} role="dialog" aria-label="Mobile menu">
          <div className="bg-[rgba(10,14,20,0.52)] border border-white/15 rounded-[18px] backdrop-blur-[16px] shadow-[0_26px_80px_rgba(0,0,0,0.35)] p-[14px] flex flex-col gap-[10px]">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.targetId}
                className="no-underline text-white/80 font-normal p-3 rounded-[14px] bg-white/5 font-[family-name:var(--secondary-font)] border-0 w-full text-left cursor-pointer hover:bg-white/10"
                onClick={(e) => onNavigateTo(e, item.targetId)}
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/packages"
              className="no-underline font-semibold text-white/95 p-3 rounded-[10px] bg-[rgb(var(--brand-cyan))] font-[family-name:var(--secondary-font)]"
              onClick={onMobileBookNowClick}
            >
              Book Here
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}