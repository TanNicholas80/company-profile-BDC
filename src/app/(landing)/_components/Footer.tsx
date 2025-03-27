import { Input } from '@/app/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaWhatsapp, FaInstagram, FaChevronCircleRight } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-black-gray rounded-t-4xl p-6 flex flex-col gap-8 xl:flex-row'>
      <div className='w-full xl:w-1/2 px-5 flex flex-col gap-3 items-center xl:items-start text-white'>
        <Image src="/images/logo_textWhite.png" alt='Logo Bungah Dental Care' height={180} width={180} />

        <p className='text-sm text-center'>Copyright© 2025 Bungah Dental Family Care Clinic</p>
        <p className='text-sm text-center'>All rights reserved</p>

        <div className='flex gap-4'>
          <Link href="/">
            <FaWhatsapp size={28} color="#25D366" />
          </Link>
          <Link href="/">
            <FaInstagram size={28} color="#E1306C" />
          </Link>
        </div>
      </div>

      <div className='flex px-5 w-full justify-between text-white'>
        <div>
          <h3 className='text-lg font-semibold'>Company</h3>
          <div className='flex flex-col gap-3 mt-6'>
            <Link href="/">Services</Link>
            <Link href="/">About Us</Link>
            <Link href="/">FAQ</Link>
          </div>
        </div>
        <div>
          <h3 className='text-lg font-semibold'>Support</h3>
          <div className='flex flex-col gap-3 mt-6'>
            <Link href="/">Help Center</Link>
            <Link href="/">Terms of Service</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
        <div className='text-white px-5 hidden md:block'>
          <h3 className="text-lg font-semibold">Stay up to date</h3>
          <div className='flex items-center gap-4 mt-6'>
            <Input type="email" placeholder='your email address' />
            <Link href="/" className='p-1 rounded-full hover:bg-white hover:text-gray-400'>
              <FaChevronCircleRight />
            </Link>
          </div>
        </div>
      </div>

      <div className='text-white px-5 md:hidden'>
        <h3 className="text-lg font-semibold">Stay up to date</h3>
        <div className='flex items-center gap-4 mt-6'>
          <Input type="email" placeholder='your email address' />
          <Link href="/" className='p-1 rounded-full hover:bg-white hover:text-gray-400'>
            <FaChevronCircleRight />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer