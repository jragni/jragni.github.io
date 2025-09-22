/**
 * Header
 */
"use client"
import Image from "next/image";
import { TypeAnimation } from 'react-type-animation';

import Footer from "./Footer"
import Navbar from "./Navbar";

export interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps ) {
  return (
    <header className={`max-h-screen md:w-[48%] md:px-auto w-full ${className}`}>
      <div className="md:flex md:flex-col pt-12 pb-8 px-6 md:px-0 md:py-24 md:h-screen align-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-lightest-slate font-extrabold">Jhensen Ray Agni</h1>
        <div className="my-8 flex justify-center">
          <div className="w-[200px] h-[200px] md:h-[200px] sm:w-[200px] rounded-full overflow-hidden">
            <Image
              alt="jhensen's headshot"
              className="w-full h-full object-cover"
              height={150}
              src="/surf.png"
              width={150}
            />
          </div>
        </div>
          <TypeAnimation
            sequence={[
              'Software Engineer',
              4000,
              'Robotics Engineer',
              3000,
              'Mechanical Engineer',
              4000,
            ]}
            wrapper="h2"
            cursor={true}
            repeat={Infinity}
            style={{ display: 'inline-block' }}
            className="mt-3 mb-6 text-lg sm:text-xl md:text-2xl lg:text-3xl text-lightest-slate"
            />
          <p className="text-slate max-w-xl md:py-0 py-8 text-sm sm:text-base md:text-lg leading-relaxed">
            Los Angeles native, with a passion for leading highly effective engineering teams and changing the world one line of code at a time.
          </p>
        </div>
        <Navbar />
        <Footer />
      </div>
    </header>
  );
}