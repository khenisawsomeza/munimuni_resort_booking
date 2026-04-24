"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
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

  const linkClass = "no-underline text-white font-normal text-[15px] tracking-[0.2px] relative px-[6px] py-[8px] font-[var(--font-body)] cursor-pointer"

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-300 mx-auto flex items-center justify-between gap-4 
          bg-[rgba(10,14,20,0.6)] border border-[rgba(255,255,255,0.14)] 
          rounded-[20px] shadow-[0_18px_60px_rgba(0,0,0,0.25)] 
          backdrop-blur-[14px] p-[14px_18px]">

        {/* to be replaced with logo*/} 
        <Link
          className="font-bold tracking-[0.3px] no-underline text-[rgba(255,255,255,0.92)] text-[20px] whitespace-nowrap font-[var(--font-display)]"
          href="#heroSection"
          aria-label="BeachResort home"
          onClick={(event) => onNavigateTo(event, 'heroSection')}
        >
          MuniMuni
        </Link>

        <nav className="navLinks" aria-label="Primary navigation">
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
        <div className="navActions">
          {/* Profile menu with conditional rendering based on authentication state */}
          <div className="profileMenuWrap" ref={profileMenuRef}>
            <button
              type="button"
              className="profileFabButton"
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={profileMenuOpen}
              onClick={() => {
                setProfileMenuOpen((prev) => !prev)
                setMenuOpen(false)
              }}
            >
              {/* {customerInitials} */}
            </button>

            {/* Dropdown menu for profile actions, conditionally rendered based on authentication state */}  
            {profileMenuOpen ? (
              <div className="profileDropdownMenu" role="menu" aria-label="Profile menu">
                {true ? (
                  <>
                    <p className="profileDropdownTitle">{"test"}</p>
                    <Link
                      href="/customer/history"
                      className="profileDropdownLink"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      History & Receipts
                    </Link>
                    <Link
                      href="/customer/dashboard"
                      className="profileDropdownLink"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button type="button" className="profileDropdownButton" role="menuitem" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/customer/login"
                    className="profileDropdownLink"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            ) : null}
          </div>

          <Link
            className="bookNowBtn"
            href="/packages"
          >
            Book Here
          </Link>

          {/* Mobile menu button, visible on smaller screens */}
          <button
            type="button"
            className="menuButton"
            ref={menuButtonRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => {
              setMenuOpen((prev) => !prev)
              setProfileMenuOpen(false)
            }}
          >
            <span className="menuIcon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu, conditionally rendered based on menuOpen state */}
      {menuOpen && (
        <div className="mobileMenu" ref={mobileMenuRef} role="dialog" aria-label="Mobile menu">
          <div className="mobileMenuInner">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.targetId}
                className="mobileNavLink"
                onClick={(e) => onNavigateTo(e, item.targetId)}
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/packages"
              className="mobileBookNow"
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