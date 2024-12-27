/**
 * Header
 * TODO add mobile responsiveness
 */
"use client"
import { TypeAnimation } from 'react-type-animation';

import Footer from "./Footer"
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="lg:w-[48%] lg:flex lg:flex-col lg:py-24 lg:h-screen lg:sticky align-center justify-between">
      <div className="">
        <h1 className="text-4xl text-lightest-slate">Jhensen Ray Agni</h1>
        <TypeAnimation
          sequence={[
            'Software Engineer', // Types 'One'
            4000, // Waits 1s
            'Robotics Engineer', // Deletes 'One' and types 'Two'
            3000, // Waits 2s
            'Mechanical Engineer', // Types 'Three' without deleting 'Two'
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
    </header>
  );
}