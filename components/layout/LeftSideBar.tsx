"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constants'

const LeftSideBar = () => {
    const pathname = usePathname()
  return (
    <div className='h-screen top-0 left-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden'>
        <Image src='/logo.png' alt='Sam Altman' width={150} height={70}/>
        <div className='flex flex-col gap-12'>
            {
                navLinks.map((link)=>(
                    <Link href={link.url} key={link.label}  className={`flex gap-4 text-body-medium hover:text-blue-950 transition-all duration-75 ${pathname === link.url ? "text-blue-1": ""}`}>
                        {link.icon} <p>{link.label}</p>
                    </Link>
                ))
            }
        </div>

        <div className='flex gap-4 text-body-medium items-center'>
           <SignedOut>
            <SignInButton/>
            </SignedOut> 
            <SignedIn>
            <UserButton/> <p>Edit Profile</p>
            </SignedIn>
        </div>
    </div>
  )
}

export default LeftSideBar