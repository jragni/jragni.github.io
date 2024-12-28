/**
 * Header
 * TODO add mobile responsiveness
 */
"use client"
import { TypeAnimation } from 'react-type-animation';

import Footer from "./Footer"
import Navbar from "./Navbar";

export interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps ) {
  return (
    <header className={`max-h-screen md:w-[48%] w-full ${className}`}>
      <div className="md:flex md:flex-col md:py-24 md:h-screen align-center justify-between">
        <div>
          <h1 className="text-4xl text-lightest-slate">Jhensen Ray Agni</h1>
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
            className="my-6 text-2xl text-lightest-slate"
            />
          <p className="text-slate max-w-xl">
            Los Angeles native, with a passion for leading highly effective engineering teams and changing the world one
            line of code at a time.
          </p>
        </div>
        <Navbar />
        <Footer />
      </div>
    </header>
  );
}