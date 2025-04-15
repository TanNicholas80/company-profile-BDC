"use client"

import { Button } from '@/app/components/ui/button'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-transparent px-3 md:px-24 lg:px-52 py-3 flex items-center'>
      <nav className='flex w-full justify-between items-center py-4 px-7 md:px-7 rounded-full shadow-md bg-accentColor-125'>
        {/* Logo */}
        <div className='flex items-center'>
          <Image
            src="/images/logo.png"
            className='hidden md:block'
            alt='Logo Bungah Dental Care'
            width={200}
            height={200}
            priority
          />
          <Image
            src="/images/onlyLogo.png"
            className='md:hidden'
            alt='Logo Bungah Dental Care'
            width={50}
            height={50}
            priority
          />
        </div>

        {/* Menu desktop */}
        <ul className='gap-6 hidden lg:flex'>
          <li><Link href="/">Beranda</Link></li>
          <li><Link href="/about">Tentang Kami</Link></li>
          <li><Link href="/services">Layanan</Link></li>
          <li><Link href="/FAQ">FAQ</Link></li>
        </ul>

        {/* Button Login Desktop */}
        <Button asChild className='hidden lg:flex bg-primary-red px-8 rounded-full hover:opacity-70 hover:bg-primary-red'>
          <Link href="/login">Masuk</Link>
        </Button>

        {/* Menu Mobile */}
        <Button
          ref={buttonRef}
          className='lg:hidden flex rounded-full hover:bg-blue-300 py-2'
          variant="ghost"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Dropdown menu mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              className="fixed top-20 right-10 w-48 bg-white border-[0.25px] rounded-l-4xl rounded-br-4xl shadow-md lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul className="flex flex-col items-center gap-4 py-4">
                {[
                  { href: "/", label: "Beranda" },
                  { href: "/about", label: "Tentang Kami" },
                  { href: "/services", label: "Layanan" },
                  { href: "/FAQ", label: "FAQ" }
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-blue-500 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button asChild className='bg-primary-red rounded-full px-8 hover:opacity-70 hover:bg-primary-red'>
                    <Link
                      href="/login"
                      onClick={() => setMenuOpen(false)}
                    >
                      Masuk
                    </Link>
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar;