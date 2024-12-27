/**
 * HomePage
 */

import ExperienceSection from "./ExperienceSection";
import Header from "./Header";

export default function Home() {
  return (
    <div className="md:flex md:gap-4 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0" >
      <Header />
      <main className="w-screen md:w-[52%]">
        <ExperienceSection />
      </main>
    </div>
  );
}
