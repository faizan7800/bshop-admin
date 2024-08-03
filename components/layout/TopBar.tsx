'use client'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'

const TopBar = () => {
  const [dropDown, setDropDown] = useState(false)
  const pathname = usePathname()
  return (
    <div className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-lg lg:hidden'>
      <Image src='/logo.png' alt='Sam Altman' width={150} height={70} />
      <div className='flex gap-8 max-md:hidden'>
        {
          navLinks.map((link) => (
            <Link 
            href={link.url} 
            key={link.label} 
            className={`flex gap-4 text-body-mediumhover:text-blue-950 transition-all duration-75 ${pathname === link.url ? "text-blue-1": ""}`}>
              <p>{link.label}</p>
            </Link>
          ))
        }
      </div>

      <div className='relative flex gap-4 items-center'>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Menu className='cursor-pointer md:hidden' onClick={() => { setDropDown(!dropDown) }} />
          {
            dropDown && (
              <div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-sm lg:hidden'>
                {
                  navLinks.map((link) => (
                    <Link href={link.url} key={link.label}  className={`flex gap-4 text-body-medium hover:text-blue-950 transition-all duration-75 ${pathname === link.url ? "text-blue-1": ""}`}>
                     {link.icon} <p>{link.label}</p>
                    </Link>
                  ))
                }
              </div>
            )
          }
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default TopBar