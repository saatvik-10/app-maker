'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Button } from './ui/button';
// import { Header } from '@/components/Header'
// import { motion } from 'motion/react'
// import { containerVariants, itemVariants } from '@/lib/animation-variants'
// import { ThemeButton } from '@/components/theme-button'

export function Appbar() {
  return (
    // <motion.div
    // 	variants={containerVariants}
    //  	initial="hidden"
    //  	animate="visible"
    // 	className="flex items-center mt-4 justify-between"
    // >
    //   <Header />

    //   <motion.div variants={itemVariants} className="flex gap-2 items-center justify-center">
    // <ThemeButton />
    <div className='w-full flex justify-center px-4 mt-8 text-white'>
      <div className='flex items-center justify-between shadow-md shadow-white px-6 py-4 w-full max-w-7xl rounded-xl font-bold text-xl'>
        AppSta
        <div className='flex items-center gap-1.5 justify-center'>
          <SignedOut>
            <SignInButton>
              <Button className='bg-white text-red-800 font-bold hover:bg-red-100 cursor-pointer px-4 py-2 rounded-xl'>
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton>
              <Button className='bg-white text-red-800 font-bold hover:bg-red-100 cursor-pointer px-4 py-2 rounded-xl'>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
    //   </motion.div>
    // </motion.div>
  );
}
